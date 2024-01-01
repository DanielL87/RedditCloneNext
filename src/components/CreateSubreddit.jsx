"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateSubreddit() {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
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

    if (info.error) {
      return setError(info.error);
    }

    setName("");
    setIsCreating(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      {!isCreating ? (
        <div>
          <a href="#" onClick={() => setIsCreating(true)}>
            Create a New Subreddit Community!
          </a>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="form-container">
            <div>Create a New Subreddit</div>
            <input
              value={name}
              placeholder="Subreddit Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button>Create Subreddit</button>
            <button type="button" onClick={() => setIsCreating(false)}>
              Cancel
            </button>
            <p>{error}</p>
          </form>
        </div>
      )}
    </div>
  );
}
