import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq, ilike } from "drizzle-orm";

export async function getBlogs(filter?: string) {
  if (filter) {
    return db
      .select()
      .from(blogs)
      .where(ilike(blogs.title, `%${filter}%`))
      .orderBy(desc(blogs.likes));
  }

  return db.select().from(blogs).orderBy(desc(blogs.likes));
}

export async function getBlogById(id: number) {
  const result = await db.select().from(blogs).where(eq(blogs.id, id));

  return result[0];
}

export async function createBlog(data: {
  title: string;
  author: string;
  url: string;
}) {
  await db.insert(blogs).values({
    title: data.title,
    author: data.author,
    url: data.url,
    likes: 0,
  });
}

export async function likeBlog(id: number) {
  const blog = await getBlogById(id);

  if (!blog) return;

  await db
    .update(blogs)
    .set({
      likes: blog.likes + 1,
    })
    .where(eq(blogs.id, id));
}
