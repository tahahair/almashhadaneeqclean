import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from '../../../../lib/prisma';

enum UserType {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  WORKER = "WORKER",
}

export async function POST(req: Request) {
  try {
    const { name, phone, password, type } = await req.json();
    if (!phone || !password) 
      return NextResponse.json({ error: "Phone and password required" }, { status: 400 });

    const existingUser = await prisma.user.findUnique({ where: { phone } });

    if (existingUser) {
      const isValid = await bcrypt.compare(password, existingUser.password);
      if (!isValid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

      if (!existingUser.phoneVerified) 
        return NextResponse.json({ error: "Phone number is not verified. Please verify it first." }, { status: 403 });

      return NextResponse.json({ message: "Login successful", user: existingUser }, { status: 200 });
    } else {
      if (!name) return NextResponse.json({ error: "Name required for new users" }, { status: 400 });

      const userType: UserType = type?.toUpperCase() in UserType ? type.toUpperCase() as UserType : UserType.CUSTOMER;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { name, phone, password: hashedPassword, type: userType, phoneVerified: false }, // phoneVerified false by default
      });

      return NextResponse.json({ message: "User created successfully. Please verify your phone number.", user: newUser }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
