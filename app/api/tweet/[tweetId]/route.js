import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_, res) {
  const { tweetId } = await res.params;

  if (!tweetId)
    return new NextResponse(JSON.stringify({ error: "No tweetId detected" }));

  console.log(tweetId);
  const tweetById = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });
  if (tweetById) {
    console.log(tweetById);
    return new NextResponse(JSON.stringify({ tweetById }));
  }
  return new NextResponse(JSON.stringify({ error: "Problem finding tweet" }));
}
