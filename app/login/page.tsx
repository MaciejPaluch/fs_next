"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "../components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  // ZABEZPIECZENIE 1: Stan ładowania
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ZABEZPIECZENIE 2: Czyszczenie błędów i blokada formularza na czas wysyłania
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password");
        setIsLoading(false); // Odblokowujemy formularz, żeby spróbować ponownie
      } else {
        showNotification("Logged in successfully!", "success");
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && (
        <p data-testid="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              disabled={isLoading}
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
              disabled={isLoading}
              className="mt-1 px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          data-testid="login-button"
          className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
