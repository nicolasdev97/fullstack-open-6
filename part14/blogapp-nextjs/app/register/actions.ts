"use server";

import bcrypt from "bcryptjs";

import { redirect } from "next/navigation";

import { db } from "@/db";

import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

export type FormState = {
  errors: string[];

  fields: {
    username: string;
    name: string;
    password: string;
    passwordConfirm: string;
  };
};

export async function registerUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get("username") as string;

  const name = formData.get("name") as string;

  const password = formData.get("password") as string;

  const passwordConfirm = formData.get("passwordConfirm") as string;

  const fields = {
    username,
    name,
    password,
    passwordConfirm,
  };

  const errors: string[] = [];

  if (!username || username.length < 4) {
    errors.push("Username must be at least 4 characters");
  }

  if (!password || password.length < 4) {
    errors.push("Password must be at least 4 characters");
  }

  if (password !== passwordConfirm) {
    errors.push("Passwords do not match");
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (existingUser.length > 0) {
    errors.push("Username already exists");
  }

  if (errors.length > 0) {
    return {
      errors,
      fields,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  redirect("/login?register=success");
}
