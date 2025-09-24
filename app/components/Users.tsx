"use client"

import { useRouter } from "next/navigation"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

export default function Users({ users }: { users: User[] }) {
  const router = useRouter()
  

  return (
    <div className="max-w-6xl p-4">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        People You Can Pay
      </h2>

      <div className="grid gap-5 justify-items-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          
          <div
            key={user.id}
            className="rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between w-full"
          >
            {/* Top Section: Avatar + Name */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-lg">
                {user.firstName[0]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() =>
                  router.push(`/send?id=${user.id}&name=${user.firstName}`)
                }
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                Pay Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}