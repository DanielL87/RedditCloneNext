"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function EditPost({ post, setIsEditing, isComment }) {
  const [error, setError] = useState("");
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const router = useRouter();

  async function handleEdit(e) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ text, title }),
    });
    const info = await res.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }
    setIsEditing(false);
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={handleEdit} className="form-container">
        {isComment && (
          <div>
            <p>Title:</p>
            <input onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
        )}
        <p>Text:</p>
        <input onChange={(e) => setText(e.target.value)} value={text} />
        <div>
          <button>Edit</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
}
