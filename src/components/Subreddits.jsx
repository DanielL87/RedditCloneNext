import Subreddit from "@/components/Subreddit.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import CreateSubreddit from "./CreateSubreddit.jsx";

export default async function Subreddits() {
  const subreddits = await prisma.subreddit.findMany({
    include: { user: true, posts: true },
    orderBy: {
      CreatedAt: "desc",
    },
  });

  const user = await fetchUser();

  return (
    <div id="subreddits-container">
      Subreddits
      {user.id && <CreateSubreddit />}
      {subreddits.map((subreddit) => (
        <div key={subreddit.id} className="single-subreddit-container">
          <Subreddit subreddit={subreddit} />
        </div>
      ))}
    </div>
  );
}
