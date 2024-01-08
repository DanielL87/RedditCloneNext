import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function Subreddit({ subreddit }) {
  const post = await prisma.post.findMany({
    where: { subredditId: subreddit.id, parentId: null },
  });
  return (
    <div>
      <Link href={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
      <p>created by: {subreddit.user.username}</p>
      <p>number of posts: {post.length}</p>
    </div>
  );
}
