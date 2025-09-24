import { PrismaClient } from "@prisma/client";

// extend global object to include the prisma client  instanc
declare global {
    var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
