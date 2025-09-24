"use client"

import { useState, useRef, useEffect } from "react"
import LogoutButton from "./LogoutButton"
import { useRouter } from "next/navigation"

function Appbar({ userName }: { userName: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement | null>(null)

  // close dropdown if clicked outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <header className="sticky top-0 bg-white shadow-md z-10">
      <div className="h-16 px-4 sm:px-8 flex justify-between items-center">
        {/* Left: App name */}
        <div className="text-xl font-bold text-stone-800">Payments App</div>

        {/* Right: Avatar + Dropdown */}
        <div className="relative" ref={menuRef}>
          {/* Avatar Button */}
          <button
            onClick={() => setOpen(!open)}
            className="bg-stone-200 rounded-full h-12 w-12 flex items-center justify-center text-xl font-semibold text-stone-700 cursor-pointer"
          >
            {userName[0].toUpperCase()}
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 text-sm">
              <div className="px-4 py-2 text-gray-700 font-medium border-b">
                Hello, {userName}
              </div>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
              >
                Settings
              </button>
              <div className="border-t my-1"></div>
              <div className="px-2">
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Appbar
