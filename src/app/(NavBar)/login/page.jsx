"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/users/login", {
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
      <form onSubmit={handleLogin} className="form-container">
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
        <button>Login</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>

        <p>{error}</p>
      </form>
    </div>
  );
}
