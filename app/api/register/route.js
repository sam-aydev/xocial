import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return new NextResponse(
      JSON.stringify({ error: "Please fill in all the details" }),
      { status: 403 }
    );
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 6);
      console.log(hashedPassword);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      if (user) {
        console.log(user);
        return new NextResponse(
          JSON.stringify({
            success: user,
          }),
          { status: 200 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({
            error: "There was error creating user",
          }),
          { status: 403 }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
