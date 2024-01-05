import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Post from "./Post.jsx";
import CreatePost from "./CreatePost.jsx";

export default async function Posts() {
  const user = await fetchUser();

  const posts = await prisma.post.findMany({
    include: { subreddit: true, user: true, votes: true, children: true },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  //fetch votes here and pass down

  return (
    <div className="posts-container">
      Posts
      {user.id && <CreatePost />}
      {posts.map((post) => (
        <div key={post.id} className="single-post-container">
          <Post post={post} user={user} />
        </div>
      ))}
    </div>
  );
}
