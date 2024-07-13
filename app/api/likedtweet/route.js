import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  if (user) {
    const likedPost = await prisma.tweet.findMany({
      where: {
        likes: {
          some: {
            authorId: user.id,
          },
        },
      },
    });
    if (likedPost) {
      console.log(likedPost);
      return new NextResponse(JSON.stringify({ likedPost }), { status: 201 });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Unable to find liked post..." })
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "No user found" }));
  }
}
