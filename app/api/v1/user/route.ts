import { userUpdateSchema } from "@/lib/zod/userSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaSignleton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({
      message: "Authentication error: Not logged in.",
    }, { status: 401 });
  }

  const dataToUpdate = await req.json();

  try {
    const result = userUpdateSchema.safeParse(dataToUpdate);
    if (!result.success) {
      return NextResponse.json({
        error: result.error,
        message: "Provide valid inputs.",
      }, { status: 400 });
    }

    // Update the user details and fetch the full user object including balance
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(session.user.id as string),
      },
      data: result.data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        // Include the account balance in the response
        account: {
          select: {
            balance: true,
          },
        },
      },
    });

    // You need to flatten the response to match your session structure
    const userWithBalance = {
      id: updatedUser.id.toString(), // Ensure ID is a string
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      balance: updatedUser.account?.balance,
    };

    return NextResponse.json({
      message: "User updated successfully",
      user: userWithBalance,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Failed to update user. Please try again later.",
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if(!session) {
        return NextResponse.json({
            message: "Authentication error: Not logged in"
        }, {status: 401})
    }

    const filter = req.nextUrl.searchParams.get('filter')

    try {
        const users = await fetchUsers(filter ?? "")
        return NextResponse.json({
            success: true,
            data: users
        })
    } catch(e) {
        console.error("Error fetching users: ", e)
        return NextResponse.json({
            success: false, 
            message: "Internal server error"
        }, {status: 500})
    }
}

export async function fetchUsers(filter: string) {
    // will not return user it self
    const session = await getServerSession(authOptions)
    
    if(!session?.user) {
        throw new Error("Authentication error: Not logged in")
    }
    
    return prisma.user.findMany({
        where: {
            NOT: {
                id: Number(session.user.id)
            },
            OR: [{
                firstName: {
                    contains: filter,
                    mode: 'insensitive'
                }
            }, {
                lastName: {
                    contains: filter,
                    mode: 'insensitive'
                }
            }]
        }, 
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
        }
    })
    
}