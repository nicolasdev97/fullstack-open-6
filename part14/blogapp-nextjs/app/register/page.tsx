"use client";

import { useActionState, useEffect } from "react";

import { registerUser, FormState } from "./actions";
import Link from "next/dist/client/link";

import { useNotification } from "@/components/NotificationContext";

export default function RegisterPage() {
  const { showNotification } = useNotification();

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

  useEffect(() => {
    if (state.errors.length > 0) {
      showNotification("Please fix the form errors", "error");
    }
  }, [state.errors, showNotification]);

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              placeholder="Username"
              defaultValue={state.fields.username}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.includes(
              "Username must be at least 4 characters",
            ) && (
              <p data-testid="username-error" className="text-red-500">
                Username must be at least 4 characters
              </p>
            )}
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              placeholder="Name"
              defaultValue={state.fields.name}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              defaultValue={state.fields.password}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.includes(
              "Password must be at least 4 characters",
            ) && (
              <p data-testid="password-error" className="text-red-500">
                Password must be at least 4 characters
              </p>
            )}
          </div>

          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm password"
              defaultValue={state.fields.passwordConfirm}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.includes(
              "Password must be at least 4 characters",
            ) && (
              <p data-testid="password-error" className="text-red-500">
                Password must be at least 4 characters
              </p>
            )}
            {state.errors?.includes("Passwords do not match") && (
              <p data-testid="passwordConfirm-error" className="text-red-500">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            data-testid="register-button"
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
