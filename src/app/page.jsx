import Posts from "@/components/Posts.jsx";
import Subreddits from "@/components/Subreddits.jsx";
import { prisma } from "@/lib/prisma.js";

export default async function Home() {
  return (
    <div id="body-container">
      <Subreddits />
      <Posts />
    </div>
  );
}
