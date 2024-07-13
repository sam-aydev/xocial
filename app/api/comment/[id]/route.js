import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
  const session = await auth();
  const { id } = await res.params;

  if (!id)
    return new NextResponse(JSON.stringify({ error: "No postId" }), {
      status: 403,
    });

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  if (user) {
    const commentsWithUsers = await prisma.comment.findMany({
      where: {
        tweetId: id,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (commentsWithUsers) {
      return new NextResponse(JSON.stringify({ commentsWithUsers }));
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Error fetching comment" })
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "No user" }));
  }
}
