import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const { postId, isUpvote } = await req.json();

    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        message: "Please login or register to Vote!",
      });
    }

    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    let vote;

    if (existingVote) {
      if (existingVote.isUpvote === isUpvote) {
        vote = await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
      } else {
        vote = await prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            isUpvote,
          },
        });
      }
    } else {
      vote = await prisma.vote.create({
        data: {
          postId,
          userId: user.id,
          isUpvote,
        },
      });
    }

    return NextResponse.json({
      success: true,
      vote,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
