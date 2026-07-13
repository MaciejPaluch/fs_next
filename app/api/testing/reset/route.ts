import { NextRequest, NextResponse } from "next/server";
import { getUserByToken } from "@/app/services/users";
import { db } from "@/db";
import { readingList, blogs, users } from "@/db/schema";

export const DELETE = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  try {
    await db.delete(readingList);
    await db.delete(blogs);
    await db.delete(users);

    return NextResponse.json(
      { message: "Database completely reset" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reset database" },
      { status: 500 },
    );
  }
};
