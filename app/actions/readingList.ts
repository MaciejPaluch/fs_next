"use server";

import { auth } from "@/auth";
import { db } from "../../db";
import { readingList } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { markRead } from "../services/readingList";

export const createReading = async (formData: FormData) => {
  const session = await auth();
  const id = Number(formData.get("id"));
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in");
  }
  await db
    .insert(readingList)
    .values({ userId: Number(session.user.id), blogId: id, read: false });
  revalidatePath("/me");
};

export const isOnList = async (id: number) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in");
  }
  const result = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, Number(session.user.id)),
      eq(readingList.blogId, id),
    ),
  });
  if (result) {
    return true;
  }
  return false;
};

export const getMyFullReadingList = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in");
  }
  const allRead = await db.query.readingList.findMany({
    where: eq(readingList.userId, Number(session.user.id)),
    with: {
      blog: {
        columns: {
          title: true,
          id: true,
        },
      },
    },
  });
  return allRead;
};

export const markAsRead = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await markRead(id);
  revalidatePath("/me");
};
