import { db } from "../../db";
import { eq } from "drizzle-orm";
import { readingList } from "@/db/schema";

export const markRead = async (id: number) => {
  await db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, id));
};
