"use client";

import { useActionState } from "react";

import { registerUser, FormState } from "./actions";
import Link from "next/dist/client/link";

export default function RegisterPage() {
  const initialState: FormState = {
    errors: [],

    fields: {
      username: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  };

  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {state.errors.length > 0 && (
          <ul>
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <input
              name="username"
              placeholder="Username"
              defaultValue={state.fields.username}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              name="name"
              placeholder="Name"
              defaultValue={state.fields.name}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={state.fields.password}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              defaultValue={state.fields.passwordConfirm}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
