"use server";

import { redirect } from "next/navigation";

import { createBlog as createBlogService } from "@/lib/blogs";

export type FormState = {
  errors: string[];
};

export async function createBlog(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = formData.get("title") as string;

  const author = formData.get("author") as string;

  const url = formData.get("url") as string;

  const errors: string[] = [];

  if (!title || title.length < 5) {
    errors.push("Title must be at least 5 characters");
  }

  if (!author || author.length < 5) {
    errors.push("Author must be at least 5 characters");
  }

  if (!url || url.length < 5) {
    errors.push("URL must be at least 5 characters");
  }

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  await createBlogService({
    title,
    author,
    url,
  });

  redirect("/blogs");
}
