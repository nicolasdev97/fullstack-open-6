"use server";

import { cookies } from "next/headers";

export async function clearBlogNotification() {
  const cookieStore = await cookies();

  cookieStore.delete("blog-created");
}
