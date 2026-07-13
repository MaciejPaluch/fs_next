import { NextRequest, NextResponse } from "next/server";
import { getUserByToken } from "@/app/services/users";
import { getBlogsByUser } from "@/app/services/blogs";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Brak tokenu dostępu lub nieprawidłowy format" },
      { status: 401 },
    );
  }
  const token = authHeader.split(" ")[1];
  const user = await getUserByToken(token);
  if (!user) {
    return NextResponse.json({ error: "Zły token" }, { status: 401 });
  }
  const user_blogs = await getBlogsByUser(user.id);
  const userData = {
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: user_blogs.map((blog) => {
      return {
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };
    }),
  };
  return NextResponse.json(userData, { status: 200 });
};
