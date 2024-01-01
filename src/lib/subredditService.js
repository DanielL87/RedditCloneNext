import { prisma } from "@/lib/prisma.js";

const getSubreddits = async () => {
  return await prisma.subreddit.findMany({
    include: { posts: true },
    orderBy: {
      CreatedAt: "desc",
    },
  });
};

export { getSubreddits };
