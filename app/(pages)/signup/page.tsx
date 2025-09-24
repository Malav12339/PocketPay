"use client"

import BottomWarning from "@/app/components/BottomWarning";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import InputBox from "@/app/components/InputBox";
import SubHeading from "@/app/components/SubHeading";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignupErrorResponse {
  error?: string;        // for 409 and 500
  errors?: any[];        // for 422
}

export default function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        email,
        password
      })
      alert("User created successfully")
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password
      })
      if (!result?.error) {
        router.push("/dashboard")
      } else {
        alert("Invalid credentials")
      }
    } catch (e: any) {
      const err = e as AxiosError<SignupErrorResponse>
      if (err.response?.status == 409) {
        alert("email already taken")
      } else if (err.response?.status == 422) {
        alert("Validation failed: fill in all the inputs")
      } else {
        alert("Something went wrong: Please try again later")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <Heading label="Create Account" />
        <SubHeading label="Enter your information to sign up and get started" />

        <div className="space-y-4 mt-4">
          <InputBox label="First Name" placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
          <InputBox label="Last Name" placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
          <InputBox label="Email" placeholder="johndoe@example.com" type="email" onChange={(e) => setEmail(e.target.value)} />
          <InputBox label="Password" placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="pt-6">
          <Button label="Sign Up" onClick={handleSubmit} />
        </div>

        <BottomWarning label="Already have an account?" linkText="Login" to="/api/auth/signin" />
      </div>
    </div>
  )
}
