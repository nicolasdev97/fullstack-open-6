import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
  return db.select().from(users);
}

export async function getUserById(id: number) {
  const result = await db.select().from(users).where(eq(users.id, id));

  return result[0];
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
