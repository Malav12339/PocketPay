"use client"

import BottomWarning from "@/app/components/BottomWarning";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import InputBox from "@/app/components/InputBox";
import SubHeading from "@/app/components/SubHeading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    })
    console.log("signin result: ", result)
    if (!result?.error) {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <Heading label="Welcome Back" />
        <form onSubmit={handleSubmit} className="mt-4">
          <SubHeading label="Enter your credentials to access your account" />

          <div className="space-y-4 mt-4">
            <InputBox 
              label="Email" 
              placeholder="johndoe@example.com" 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <InputBox 
              label="Password" 
              placeholder="password"
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className="pt-6">
            <Button label="Sign In" type="submit" />
          </div>

          <BottomWarning label="Don't have an account?" linkText="Sign Up" to="/signup" />
        </form>
      </div>
    </div>
  )
}
