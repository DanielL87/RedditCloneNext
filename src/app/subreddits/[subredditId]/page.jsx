import CreatePost from "@/components/CreatePost.jsx";
import Post from "@/components/Post.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function SingleSubreddit({ params }) {
  const { subredditId } = params;
  const user = await fetchUser();

  const subreddit = await prisma.subreddit.findUnique({
    where: { id: subredditId },
    include: {
      posts: {
        where: { parentId: null },
        include: { user: true, votes: true },
        orderBy: { CreatedAt: "desc" },
      },
    },
  });

  return (
    <div id="single-subreddit-body">
      <h1>{subreddit.name}</h1>
      {user.id && <CreatePost subreddit={subreddit} />}

      {subreddit.posts.length === 0 ? (
        <div>
          <p>Be the first to post!</p>
        </div>
      ) : (
        subreddit.posts.map((post) => (
          <div key={post.id} className="single-post-container">
            <Post post={post} user={user} isComment={true} isSingle={true} />
          </div>
        ))
      )}
    </div>
  );
}
