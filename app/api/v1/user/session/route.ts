import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismaSignleton";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    include: { account: { select: { balance: true } } }
  });

  if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json({
    id: dbUser.id.toString(),
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
    balance: dbUser.account?.balance
  });
}
