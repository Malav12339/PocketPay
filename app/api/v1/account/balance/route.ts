import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaSignleton";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if(!session?.user.id) {
        return NextResponse.json({
            message: "Authentication error: not logged in"
        }, {status: 401})
    }

    const account = await prisma.account.findUnique({
        where: {userId: Number(session.user.id)}
    })

    return NextResponse.json({
        balance: account?.balance
    })
}