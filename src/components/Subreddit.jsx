import Link from "next/link.js";

export default async function Subreddit({ subreddit }) {
  return (
    <div>
      <Link href={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
      <p>created by: {subreddit.user.username}</p>
      <p>number of posts: {subreddit.posts.length}</p>
    </div>
  );
}
