import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Post from "./Post.jsx";
import CreatePost from "./CreatePost.jsx";

export default async function Posts() {
  const user = await fetchUser();

  const posts = await prisma.post.findMany({
    where: { parentId: null },
    include: { subreddit: true, user: true, votes: true, children: true },
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
          <Post post={post} user={user} isSingle={true} isComment={true} />
        </div>
      ))}
    </div>
  );
}
