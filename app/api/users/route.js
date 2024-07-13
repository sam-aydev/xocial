import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (user) {
    const allUsers = await prisma.user.findMany();

    if (allUsers) {
      console.log(allUsers);
      return new NextResponse(JSON.stringify({ allUsers }));
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Not able to find users" })
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "No user found" }));
  }
}
