import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"
import prisma from "./prismaSignleton"

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