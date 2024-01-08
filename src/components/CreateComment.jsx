"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export function CreateComment({ post }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!text) {
      return setError("Please select a enter text to create a post!");
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        selectedSubredditId: post.subreddit.id,
        text,
        parentId: post.id,
      }),
    });
    const info = await res.json();
    console.log(info);

    if (info.error) {
      return setError(info.error);
    }
    setError("");
    setText("");
    setIsCommenting(false);
    router.refresh();
  }

  return (
    <div className="create-comment">
      {isCommenting ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Text.."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button>Post</button>
          <button type="button" onClick={() => setIsCommenting(false)}>
            Cancel
          </button>
          <p>{error}</p>
        </form>
      ) : (
        <button onClick={() => setIsCommenting(true)}>Create Comment!</button>
      )}
    </div>
  );
}
