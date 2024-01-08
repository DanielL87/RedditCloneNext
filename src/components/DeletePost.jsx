"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function DeletePost({ post, isSingle }) {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });
    const info = await res.json();

    if (info.error) {
      return setError(info.error);
    }
    if (isSingle) {
      router.push("/");
    }
    router.refresh();
  }

  return (
    <div>
      <button onClick={handleDelete} className="button-style">
        Delete
      </button>
      <p>{error}</p>
    </div>
  );
}
