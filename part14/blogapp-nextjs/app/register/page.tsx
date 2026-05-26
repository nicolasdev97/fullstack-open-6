import bcrypt from "bcryptjs";

import { db } from "@/db";
import { users } from "@/db/schema";

import { redirect } from "next/navigation";

async function registerUser(formData: FormData) {
  "use server";

  const username = formData.get("username") as string;

  const name = formData.get("name") as string;

  const password = formData.get("password") as string;

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  redirect("/login");
}

export default function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>

      <form action={registerUser}>
        <div>
          <input name="username" placeholder="Username" />
        </div>

        <div>
          <input name="name" placeholder="Name" />
        </div>

        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
