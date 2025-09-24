import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaSignleton";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    console.log("session email of user -> ", session?.user.email)
    if(!session?.user?.email) {
        return NextResponse.json({
            message: "Authentication error: user not logged in",
            successs: false
        }, {status: 401})
    }

    const { amount, to } = await req.json()
    const receiverId = parseInt(to, 10)

    if(!receiverId || isNaN(receiverId)) {
        return NextResponse.json({
            message: "Invalid receiver ID",
            success: false
        }, { status: 400 })
    }

    // to will be user id
    if(!amount || !to) {
        return NextResponse.json({
            message: "Provide valide details to transfer money",
            successs: false
        }, {status: 400})
    }

    
    if(typeof amount !== 'number' || amount <= 0) {
        return NextResponse.json({
            message: "Invalid transfer amount",
            successs: false
        }, {status: 400})
    }
    try {
        const result = await retryTransfer(parseInt(session.user.id), receiverId, amount)
        console.log(result)

        return NextResponse.json({
            message: "transfer successful",
            success: true
        })
    } catch(error) {
        console.error("Tranfer failed: ", error)

        const errorMessage = (error as Error).message

        if(errorMessage.includes("SENDER NOT FOUND")) {
            return NextResponse.json({
                message: "sender account not found",
                success: false
            }, {status: 404})
        }
        if(errorMessage.includes("RECEIVER NOT FOUND")) {
            return NextResponse.json({
                message: "Receiver not found",
                success: false
            }, {status: 404})
        }
        if(errorMessage.includes("INSUFFICIENT BALANCE")) {
            return NextResponse.json({
                message: "Insufficient balance",
                success: false
            }, {status: 400})
        }
        console.log("error msg -> ", errorMessage)
        return NextResponse.json({
            message: "Tranfer failed. Please try again later",
            success: false
        }, {status: 500})
    }
}

async function retryTransfer(senderId: number, receiverId: number, amount: number) {
    let retries = 3;
    let delay = 200
    while(retries > 0) {
        try {
            return await transferMoney(senderId, receiverId, amount)
        } catch(err: any) {
            if(err.code === "P2028") {
                retries--
                console.warn(`Retrying transaction, attempts left: ${retries}`)
                if(retries === 0) throw err
                await new Promise(resolve => setTimeout(resolve, delay))
                delay *= 2; // double the delay time to reduce load on the db
            } else {
                throw err
            }
        }
    }
}

export async function transferMoney(senderId: number, receiverId: number, amount: number) {
    return prisma.$transaction(async (tx) => {
        const sender = await tx.user.findUnique({
            where: {id: senderId},
            include: {account: true}
        })

        if(!sender || !sender.account) {
            throw new Error("SENDER NOT FOUND OR DOES NOT HAVE AN ACCOUNT")
        }
        if(sender.account.balance  < amount ) {
            throw new Error("INSUFFICIENT BALANCE")
        }

        const reciever = await tx.user.findUnique({
            where: {id: receiverId},
            include: {account: true}
        })
        if(!reciever || !reciever.account) {
            throw new Error("RECEIVER NOT FOUND OR DOES NOT HAVE AN ACCOUNT")
        }
        
        await tx.account.update({
            where: {userId: sender.id},
            data: {balance: {decrement: amount}}
        })

        await tx.account.update({
            where: {userId: reciever.id},
            data: {balance: {increment: amount}}
        })

        return {success: true}
    }, {timeout: 10000})
}