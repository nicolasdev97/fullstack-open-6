import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

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
