"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { isUser } from "../services/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { User } from "next-auth";

export type State = {
  errors: Record<string, string>;
  values: UserData;
};

type UserData = {
  username: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

export const createUser = async (data: UserData) => {
  const errors: Record<string, string> = {};
  const username = data.username.trim();
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  } else if (await isUser(username)) {
    errors.username = "Username must be unique";
  }
  const name = data.name.trim();
  const password = data.password;
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }
  const passwordConfirm = data.passwordConfirm;
  if (!passwordConfirm || password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords must be equal";
  }
  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm } };
  }
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });
};

export const registerUser = async (prevState: State, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;
  const result = await createUser({
    username,
    name,
    password,
    passwordConfirm,
  });
  if (result?.errors) {
    return result;
  }
  redirect("/login");
};

export const generateToken = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Brak autoryzacji");
    }

    const userId = Number(session.user.id);

    await db
      .update(users)
      .set({ token: crypto.randomUUID() })
      .where(eq(users.id, userId));
    revalidatePath("/me");
  } catch (error) {
    console.error("Błąd podczas generowania tokenu:", error);
  }
};
