import Post from "@/components/Post.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function SinglePost({ params }) {
  const { postId } = params;

  const user = await fetchUser();

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      subreddit: true,
      user: true,
      votes: true,
      children: true,
    },
  });

  return (
    <div key={post.id} className="single-post-container2">
      <Post post={post} user={user} isSingle={true} />
    </div>
  );
}
