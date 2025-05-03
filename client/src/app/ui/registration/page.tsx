"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error message before trying registration
    setSuccess(null); // Reset success message

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send registration request to backend API
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! You can now log in.");
        // Redirect to login page after successful registration
        setTimeout(() => {
          window.location.href = "/ui/login"; // Redirect to login page
        }, 2000);
      } else {
        // Handle error (e.g., email already exists)
        setError(data.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow">
        <div className="container mx-auto p-5 flex flex-col items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
            <span className="ml-3 text-3xl font-semibold text-indigo-600">UNISYNC</span>
          </a>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 lg:p-12 mx-auto max-w-lg">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-800 text-sm sm:text-base mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border bg-gray-50 px-4 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-150 focus:ring"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-800 text-sm sm:text-base mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border bg-gray-50 px-4 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-150 focus:ring"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-800 text-sm sm:text-base mb-2">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border bg-gray-50 px-4 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-150 focus:ring"
                required
              />
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}
            {success && <div className="text-green-500 text-center">{success}</div>}

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white text-lg font-semibold transition duration-150 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </button>

            <div className="flex items-center justify-center text-sm text-gray-500">
              <p>
                Already have an account?{" "}
                <Link href="/ui/login" className="text-indigo-600 hover:text-indigo-800">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-600 body-font mt-8">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center justify-center text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
            <span className="ml-3 text-xl">UNISYNC</span>
          </a>
        </div>
      </footer>
    </main>
  );
}