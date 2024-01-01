import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const cookieStore = cookies();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You must provide a username and password to Login",
      });
    }

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Username not found, please Register.",
      });
    }

    const isPasswordVerified = await bcrypt.compare(password, user.password);

    if (!isPasswordVerified) {
      return NextResponse.json({
        success: false,
        error: "Username and/or password is not valid.",
      });
    }

    const token = jwt.sign(
      { userId: user.id, username },
      process.env.JWT_SECRET
    );

    cookieStore.set("token", token);

    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
