"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    if (!username.trim() && password.trim()) {
      return setError("Please enter a subreddit name.");
    }

    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const info = await res.json();

    if (info.error) {
      return setError(info.error);
    }
    router.push("/");
    router.refresh();
  }

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister} className="form-container">
        <input
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button>Register</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>

        <p>{error}</p>
      </form>
    </div>
  );
}
