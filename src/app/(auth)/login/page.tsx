"use client";

import { useAuth } from "@/lib/AuthContextProvider";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState, FormEvent } from "react";

export default function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const router = useRouter();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/login";
      const response = await axios.post(
        url,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        router.push("/profile");

        login();
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        router.push("/login");
        setError("Username or password is incorrect. Please try again.");
      } else {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-stone-500 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-grey-200"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Login
            </button>
            <Link  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" href='/signup'> Sign Up Here</Link>
            
          </div>
        </form>
      </div>
    </div>
  );
}
