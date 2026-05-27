import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { readingLists } from "@/db/schema";

export async function getUsers() {
  return db.select().from(users);
}

export async function getUserById(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function getBlogsByUserId(userId: number) {
  return db.select().from(blogs).where(eq(blogs.userId, userId));
}

export async function getUserByUsername(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),

    with: {
      blogs: true,
    },
  });
}

export async function updateUserToken(userId: number, token: string) {
  await db
    .update(users)
    .set({
      token,
    })
    .where(eq(users.id, userId));
}

export async function getUserByToken(token: string) {
  return db.query.users.findFirst({
    where: eq(users.token, token),
  });
}

export async function addToReadingList(userId: number, blogId: number) {
  await db.insert(readingLists).values({
    userId,
    blogId,
    read: false,
  });
}

export async function getReadingList(userId: number) {
  return db.query.readingLists.findMany({
    where: eq(readingLists.userId, userId),

    with: {
      blog: true,
    },
  });
}

export async function markReadingAsRead(readingListId: number) {
  await db
    .update(readingLists)
    .set({
      read: true,
    })
    .where(eq(readingLists.id, readingListId));
}
