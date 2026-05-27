"use client";

import { useActionState, useEffect } from "react";

import { createBlog, FormState } from "./actions";

import { useNotification } from "@/components/NotificationContext";

const initialState: FormState = {
  errors: [],

  fields: {
    title: "",
    author: "",
    url: "",
  },
};

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, initialState);

  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.errors.length > 0) {
      showNotification(state.errors[0], "error");
    }
  }, [state.errors, showNotification]);

  return (
    <div>
      <h1>New Blog</h1>

      <form action={formAction}>
        <div>
          <input
            name="title"
            placeholder="Title"
            defaultValue={state.fields.title}
          />
        </div>

        <div>
          <input
            name="author"
            placeholder="Author"
            defaultValue={state.fields.author}
          />
        </div>

        <div>
          <input name="url" placeholder="URL" defaultValue={state.fields.url} />
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
