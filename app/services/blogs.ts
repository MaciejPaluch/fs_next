import { eq, ilike, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";
import { useSession } from "next-auth/react";

export const getBlogs = (searchQuery?: string) => {
  if (searchQuery) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${searchQuery}%`),
    });
  }
  return db.query.blogs.findMany();
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
  id: number,
) => {
  await db.insert(blogs).values({ title, author, url, likes, userId: id });
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};

export const getBlogsByUser = async (user_id: number) => {
  const user_blogs = await db.query.blogs.findMany({
    where: eq(blogs.userId, user_id),
  });
  return user_blogs;
};
