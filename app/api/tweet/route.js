import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request) {
  const { body } = await request.json();
  const session = await auth();

  if (!body) {
    return new NextResponse(JSON.stringify({ error: "No content" }), {
      status: 403,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (user) {
    const tweet = await prisma.tweet.create({
      data: {
        body,
        authorId: user.id,
      },
    });
    if (tweet) {
      return new NextResponse(JSON.stringify({ tweet, user }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "error" }));
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "Invalid/No user" }));
  }
}

export async function GET() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });
  if (user) {
    const tweetWithUsers = await prisma.tweet.findMany({
      include: {
        author: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    if (tweetWithUsers) {
      return new NextResponse(JSON.stringify({ tweetWithUsers }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ error: "No Tweets found" }));
    }
  }
  return new NextResponse(JSON.stringify({ error: "No user" }));
}
