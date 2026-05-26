import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  username: text("username").notNull(),

  name: text("name").notNull(),
});

// Users relations: a user can have many blogs

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
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

// Blogs relations: a blog belongs to a user

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));
