"use client";
import Votes from "./Votes.jsx";
import DeletePost from "./DeletePost.jsx";
import EditPost from "./EditPost.jsx";
import Link from "next/link.js";
import { useState } from "react";

export default function Post({ post, user, isSingle }) {
  const _user = user.id === post.user.id;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="individual-post">
      <Votes post={post} user={user} />
      {isEditing ? (
        <EditPost post={post} setIsEditing={setIsEditing} />
      ) : (
        <div className="post-content">
          {post.title && <p>{post.title}</p>}
          <div>{post.text}</div>

          {_user && (
            <div className="post-buttons">
              <div>
                <button
                  className="button-style"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Post
                </button>
                <p></p>
              </div>
              <DeletePost post={post} isReply={isReply} />
            </div>
          )}
          {isSingle ? (
            <div></div>
          ) : (
            <Link href={`/posts/${post.id}`}>
              <button>Reply</button>
            </Link>
          )}

          <div className="post-footer">
            {post.subreddit && (
              <p className="subreddit-name">subreddit: {post.subreddit.name}</p>
            )}
            <p className="posted-by">posted by: {post.user.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}
