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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">New Blog</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <input
            name="title"
            placeholder="Title"
            defaultValue={state.fields.title}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div>
          <input
            name="author"
            placeholder="Author"
            defaultValue={state.fields.author}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div>
          <input
            name="url"
            placeholder="URL"
            defaultValue={state.fields.url}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}
