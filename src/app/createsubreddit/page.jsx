"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateSubreddit() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      return setError("Please enter a subreddit name.");
    }

    const res = await fetch("/api/subreddits", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    const info = await res.json();
    console.log(info);

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
      <form onSubmit={handleSubmit} className="form-container">
        <div>Create a New Subreddit</div>
        <input
          value={name}
          placeholder="Subreddit Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button>Create Subreddit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>

        <p>{error}</p>
      </form>
    </div>
  );
}
