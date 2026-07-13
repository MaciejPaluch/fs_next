"use server";

import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";
import { auth } from "@/auth";

export type State = {
  errors: Record<string, string>;
  values: {
    title: string;
    author: string;
    url: string;
    id: number | null;
  };
  success: boolean;
};

export const createBlog = async (prevState: State, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: { auth: "You must be logged in" },
      success: false,
      values: { title: "", author: "", url: "", id: null },
    };
  }
  const errors: Record<string, string> = {};
  const title = formData.get("title") as string;
  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long";
  }
  const author = formData.get("author") as string;
  if (!author || author.length < 5) {
    errors.author = "Blog author must be at least 5 characters long";
  }
  const url = formData.get("url") as string;
  if (!url || url.length < 5) {
    errors.url = "Blog url must be at least 5 characters long";
  }
  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url, id: null }, success: false };
  }
  const likes = Number(formData.get("likes") as string);
  await addBlog(title, author, url, likes, Number(session.user.id));

  revalidatePath("/blogs");
  return {
    errors: {},
    values: { title, author, url, id: null },
    success: true,
  };
};

export const like = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
