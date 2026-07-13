import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = () => {
  return db.query.users.findMany();
};

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const getUserWithBlogs = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { blogs: true },
  });
};

export const isUser = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (user) {
    return true;
  }
  return false;
};

export const getUserByToken = async (token: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  });
  if (user) {
    return user;
  }
  return null;
};
