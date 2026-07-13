"use client";

import { useActionState } from "react";
import { registerUser, State } from "../actions/users";

export default function RegisterPage() {
  const initialState: State = {
    errors: {},
    values: {
      username: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  };
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
              className="mt-1 px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
              className="mt-1 px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values?.password}
              className="mt-1 px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              required
              defaultValue={state.values?.passwordConfirm}
              className="mt-1 px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          data-testid="register-button"
        >
          Register
        </button>
        {state.errors &&
          Object.entries(state.errors).map(([field, errorText]) => (
            <p
              key={field}
              data-testid={`${field}-error`}
              style={{ color: "red" }}
            >
              {errorText}
            </p>
          ))}
      </form>
    </div>
  );
}
