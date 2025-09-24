import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SigninClient from "@/app/components/SigninClient"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

async function Signin() {
    const session = await getServerSession(authOptions)
    if(session?.user) {
        redirect("/dashboard")
    }

  return <SigninClient />
}

export default Signin