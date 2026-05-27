import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  username: text("username").notNull().unique(),

  name: text("name").notNull(),

  passwordHash: text("password_hash").notNull().default(""),

  token: text("token"),
});

// Users relations: a user can have many blogs and many reading list entries

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),

  readingLists: many(readingLists),
}));

// Blogs table

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  author: text("author").notNull(),

  url: text("url").notNull(),

  likes: integer("likes").notNull(),

  userId: integer("user_id").references(() => users.id),
});

// Blogs relations: a blog belongs to a user and can have many reading list entries

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),

  readingLists: many(readingLists),
}));

// Reading list table: many-to-many relation between users and blogs

export const readingLists = pgTable("reading_list", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),

  blogId: integer("blog_id")
    .references(() => blogs.id)
    .notNull(),

  read: boolean("read").default(false).notNull(),
});

// Reading list relations: a reading list entry belongs to a user and a blog

export const readingListsRelations = relations(readingLists, ({ one }) => ({
  user: one(users, {
    fields: [readingLists.userId],
    references: [users.id],
  }),

  blog: one(blogs, {
    fields: [readingLists.blogId],
    references: [blogs.id],
  }),
}));
