import { Prisma } from "@prisma/client";
import prisma from "@/lib/prismaSignleton";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { userSchema } from "@/lib/zod/userSchema";

export async function POST(req: NextRequest) {
    const data = await req.json()
    
    try {
        const result = userSchema.safeParse(data)
        
        if(!result.success) {
            return NextResponse.json({
                errors: result.error.issues,
            }, {status: 422})
        }

        const {password, ...userData} = result.data
        const hashedPassword = await bcrypt.hash(password, 10)
        const userToCreate = {
            ...userData, 
            email: userData.email.toLowerCase(), 
            password: hashedPassword
        }
       
        const randomBalance = Math.floor(Math.random() * (5000 - 500 + 1)) + 500

        const user = await prisma.user.create({
            data: {
                ...userToCreate,
                account: {create: {balance: randomBalance}}
            }, 
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                account: {select: {balance: true}}
            }
        })

        const { account, ...rest} = user
        return NextResponse.json({
            message: "user created successfully",
            ...rest,
            balance: account?.balance
        }, {status: 201})       

    } catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            return NextResponse.json({
                error: "email already in use."
            }, {
                status: 409
            })
        }
        console.error("error creating user ", e)
        return NextResponse.json({
            error: "failed to create the user"
        }, {
            status: 500
        })
    }
}