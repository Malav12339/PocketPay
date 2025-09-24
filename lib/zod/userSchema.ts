import { email, string, z } from "zod"

export const userSchema = z.object({
    email: z.email({message: "Please provide a valid email buddy"}),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(5)
})

export const userUpdateSchema = userSchema.partial()

export type userInput = z.infer<typeof userSchema>