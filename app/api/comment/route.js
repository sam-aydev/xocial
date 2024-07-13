import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request) {
  const session = await auth();
  const { body, id } = await request.json();

  if (!body)
    return new NextResponse(JSON.stringify({ error: "No content" }), {
      status: 403,
    });

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  if (user) {
    const comment = await prisma.comment.create({
      data: {
        body,
        authorId: user?.id,
        tweetId: id,
      },
    });
    if (comment) {
      return new NextResponse(
        JSON.stringify({
          comment,
        }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Error in posting comment" })
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Invalid user or No user found" })
    );
  }
}
