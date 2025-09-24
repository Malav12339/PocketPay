import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession['user'] & {
            id: string,
            firstName: string,
            lastName: string,
            balance?: number
        } 
    } 
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        firstName: string,
        lastName: string,
        balance?: number,
        trigger?: JWTTrigger
    }
}