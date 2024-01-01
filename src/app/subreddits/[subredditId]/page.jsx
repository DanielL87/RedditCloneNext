import CreatePost from "@/components/CreatePost.jsx";
import Post from "@/components/Post.jsx";
import { prisma } from "@/lib/prisma.js";

export default async function SingleSubreddit({ params }) {
  const { subredditId } = params;

  const subreddit = await prisma.subreddit.findUnique({
    where: { id: subredditId },
    include: {
      posts: {
        include: { user: true },
        orderBy: { CreatedAt: "desc" },
      },
    },
  });

  // if (!subreddit) {
  //   subreddit = {};
  // }
  return (
    <div id="single-subreddit-body">
      <h1>{subreddit.name}</h1>
      <CreatePost subreddit={subreddit} />
      {subreddit.posts.length === 0 ? (
        <div>
          <p>Be the first to post!</p>
        </div>
      ) : (
        subreddit.posts.map((post) => (
          <div key={post.id} className="single-post-container">
            <Post post={post} />
          </div>
        ))
      )}
    </div>
  );
}
