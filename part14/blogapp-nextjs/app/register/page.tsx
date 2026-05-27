"use client";

import { useActionState } from "react";

import { registerUser, FormState } from "./actions";

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
    <div>
      <h1>Register</h1>

      {state.errors.length > 0 && (
        <ul>
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <form action={formAction}>
        <div>
          <input
            name="username"
            placeholder="Username"
            defaultValue={state.fields.username}
          />
        </div>

        <div>
          <input
            name="name"
            placeholder="Name"
            defaultValue={state.fields.name}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={state.fields.password}
          />
        </div>

        <div>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password"
            defaultValue={state.fields.passwordConfirm}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
