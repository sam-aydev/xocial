import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request) {
  const { authorId, tweetId } = await request.json();
  const session = await auth();

  if (!authorId || !tweetId)
    return new NextResponse(
      JSON.stringify({ error: "No tweetId or authorId" })
    );

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });
  if (user) {
    const like = await prisma.like.create({
      data: {
        authorId,
        tweetId,
      },
    });

    if (like) {
      console.log(like);
      return new NextResponse(JSON.stringify({ like }), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "error liking the post" })
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "No user found" }));
  }
}

export async function DELETE(request) {
  const { authorId, tweetId } = await request.json(); 
  const session = await auth();

  if (!authorId || !tweetId)
    return new NextResponse(JSON.stringify({ error: "No TweetId or UserId" }));

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });
  if (user) {
    const likeDelete = await prisma.like.delete({
      where: {
        authorId,
        tweetId,
      },
    });

    if (likeDelete) {
      console.log("Deleted");
      return new NextResponse(JSON.stringify({ likeDelete }), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "error liking the post" })
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "No user found" }));
  }
}
