import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import Post from "./Post.jsx";
import CreatePost from "./CreatePost.jsx";

export default async function Posts() {
  const user = await fetchUser();

  const posts = await prisma.post.findMany({
    include: { subreddit: true, user: true },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  return (
    <div className="posts-container">
      Posts
      {user.id && <CreatePost />}
      {posts.map((post) => (
        <div key={post.id} className="single-post-container">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
