import { CreateComment } from "@/components/CreateComment.jsx";
import DisplayComments from "@/components/DisplayComments.jsx";
import Post from "@/components/Post.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { userAgent } from "next/server.js";

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
      children: {
        include: {
          user: true,
          votes: true,
          subreddit: true,
        },
      },
    },
  });

  return (
    <div id="individual-post-body">
      <div key={post.id} className="single-post-container2">
        <Post
          post={post}
          user={user}
          isSingle={false}
          subreddit={post.subreddit}
          isComment={true}
        />
      </div>
      {/* {user.id && <CreateComment post={post} />} */}
      <h2>Comments:</h2>
      <DisplayComments post={post} user={user} />
    </div>
  );
}
