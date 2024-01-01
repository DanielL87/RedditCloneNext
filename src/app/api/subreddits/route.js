import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function GET() {
  try {
    const subreddits = await prisma.subreddit.findMany({
      include: { posts: true },
    });

    return NextResponse.json({
      success: true,
      subreddits,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req, res) {
  try {
    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "Please login or register to create subreddit!",
      });
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({
        success: false,
        message: "Please provide a name to create subreddit!",
      });
    }

    const subreddit = await prisma.subreddit.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, subreddit });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
