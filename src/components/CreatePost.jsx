"use client";

import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function CreatePost({ subreddit }) {
  const [subreddits, setSubreddits] = useState([]);
  const [selectedSubredditId, setSelectedSubredditId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const router = useRouter();

  async function fetchSubreddits() {
    const res = await fetch("/api/subreddits", {});
    const info = await res.json();
    setSubreddits(info.subreddits);
  }

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!selectedSubredditId || !text) {
      return setError(
        "Please select a subreddit and enter text to create a post!"
      );
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ selectedSubredditId, title, text }),
    });
    const info = await res.json();

    if (info.error) {
      return setError(info.error);
    }

    setSelectedSubredditId("");
    setTitle("");
    setText("");
    setError("");

    setIsPosting(false);
    if (subreddit) {
      router.push(`/subreddits/${subreddit.id}`);
    } else {
      router.push("/");
    }
    router.refresh();
  }

  useEffect(() => {
    fetchSubreddits();
  }, []);

  useEffect(() => {
    if (subreddit) {
      setSelectedSubredditId(subreddit.id);
    }
  }, [subreddit]);

  return (
    <div>
      {!isPosting ? (
        <div>
          <a href="#" onClick={() => setIsPosting(true)}>
            Create New Post!
          </a>
        </div>
      ) : (
        <div>
          <form className="form-container" onSubmit={handleCreatePost}>
            <h3>Create Post</h3>

            {!subreddit && (
              <select
                value={selectedSubredditId}
                onChange={(e) => setSelectedSubredditId(e.target.value)}
              >
                <option value="">Select a Subreddit</option>
                {subreddits.map((subreddit) => (
                  <option key={subreddit.id} value={subreddit.id}>
                    {subreddit.name}
                  </option>
                ))}
              </select>
            )}

            <input
              type="text"
              placeholder="Title.."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              type="text"
              placeholder="Text.."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button>Post</button>
            <button type="button" onClick={() => setIsPosting(false)}>
              Cancel
            </button>
            <p>{error}</p>
          </form>
        </div>
      )}
    </div>
  );
}
