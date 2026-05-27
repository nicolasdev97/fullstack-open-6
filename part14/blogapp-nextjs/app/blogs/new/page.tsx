"use client";

import { useActionState } from "react";

import { createBlog, FormState } from "./actions";

const initialState: FormState = {
  errors: [],
};

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <div>
      <h1>New Blog</h1>

      {state.errors.length > 0 && (
        <ul>
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <form action={formAction}>
        <div>
          <input name="title" placeholder="Title" />
        </div>

        <div>
          <input name="author" placeholder="Author" />
        </div>

        <div>
          <input name="url" placeholder="URL" />
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
