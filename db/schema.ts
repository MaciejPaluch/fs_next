import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").default(0).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));

export const readingList = pgTable(
  "reading_list",
  {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),

    blogId: integer("blog_id")
      .references(() => blogs.id)
      .notNull(),

    read: boolean("read").default(false).notNull(),
  },
  (t) => ({
    uniqueReadingListItem: unique().on(t.userId, t.blogId),
  }),
);

export const readingListRelations = relations(readingList, ({ one }) => ({
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}));

export const blogsReadingRelations = relations(blogs, ({ many }) => ({
  readingList: many(readingList),
}));
