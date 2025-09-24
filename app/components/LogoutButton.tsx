"use client"

import { signOut } from "next-auth/react"

function LogoutButton() {
  return (
    <button 
      className="w-full text-left px-2 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer rounded"
      onClick={() => signOut({callbackUrl: "/auth/signin"})}
    >
      Log out
    </button>
  )
}

export default LogoutButton