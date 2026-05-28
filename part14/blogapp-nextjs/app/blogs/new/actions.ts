"use server";

import { redirect } from "next/navigation";

import { createBlog as createBlogService } from "@/lib/blogs";

import { auth } from "@/auth";

import { cookies } from "next/headers";

export type FormState = {
  errors: string[];

  fields: {
    title: string;
    author: string;
    url: string;
  };
};

export async function createBlog(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();

  const title = formData.get("title") as string;

  const author = formData.get("author") as string;

  const url = formData.get("url") as string;

  if (!session?.user) {
    return {
      errors: ["You must be logged in"],

      fields: {
        title,
        author,
        url,
      },
    };
  }

  const fields = {
    title,
    author,
    url,
  };

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
      fields,
    };
  }

  await createBlogService({
    title,
    author,
    url,

    userId: Number(session.user.id),
  });

  const cookieStore = await cookies();

  cookieStore.set("blog-created", "true");

  redirect("/blogs");
}
