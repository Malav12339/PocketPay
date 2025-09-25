"use client"
export const dynamic = "force-dynamic";
import Button from "@/app/components/Button"
import InputBox from "@/app/components/InputBox"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState, Suspense } from "react"

interface ErrorResponse {
    success: boolean
    message: string
}

function SendContent() {
    const session = useSession()
    const searchParams = useSearchParams()
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const friendName = searchParams.get("name")
    const friendId = searchParams.get("id")

    if(session.status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if(!session.data?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                    <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
                    <p className="text-gray-600 mb-6">Please sign in to send money to your friends</p>
                    <Link href="/signin" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                        Sign In
                    </Link>
                </div>
            </div>
        )
    }

    function safeParseInt(str: string) {
        if(/^\d+$/.test(str)) {
            return parseInt(str, 10)
        }
        return null
    }

    const handleSend = async () => {
        if(!friendId) {
            alert("User ID not provided")
            return;
        }
        
        const parsedFriendId = parseInt(friendId, 10)
        if(isNaN(parsedFriendId)) {
            alert("Invalid user ID")
            return;
        }

        const parsedAmount = safeParseInt(amount)
        if(!parsedAmount || parsedAmount <= 0) {
            alert("Please enter a valid amount greater than 0")
            return;
        }
        
        setIsLoading(true)
        try {
            const response = await axios.post("/api/v1/account/transfer", {
                amount: parsedAmount,
                to: friendId
            })
            if(response.data.success) {
                alert("Transfer successful!")
                window.dispatchEvent(new CustomEvent('balanceUpdated'))
                await session.update()
                router.push('/dashboard')
            }
        } catch(er: unknown) {
            // console.error("--------------error came -------------\n")
            // console.error(e.response.data.message)
            const e = er as AxiosError<ErrorResponse>
            if(e.response?.data?.message === "Insufficient balance") {
                alert("Insufficient balance")
            } else {
                alert("Transfer failed. Please try again....")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const formatAmount = (amt: string) => {
        if (!amt) return ""
        const num = parseInt(amt)
        if (isNaN(num)) return ""
        return `₹${num.toLocaleString('en-IN')}`
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center">
                        <Link 
                            href="/dashboard" 
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Dashboard
                        </Link>
                        <div className="flex-1 text-center">
                            <h1 className="text-lg font-semibold text-gray-900">Send Money</h1>
                        </div>
                        <div className="w-20"></div> {/* Balance for centering */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-64px)]">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
                    {/* Recipient Info */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold mb-4 shadow-lg">
                            {friendName ? friendName[0].toUpperCase() : "?"}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            Send to {friendName || "Friend"}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Enter the amount you want to transfer
                        </p>
                    </div>

                    {/* Amount Preview with Transition */}
                    <div 
                        className={`transition-all duration-500 ease-out ${
                            amount 
                                ? 'max-h-40 opacity-100 mb-6' 
                                : 'max-h-0 opacity-0 mb-0'
                        }`}
                        style={{
                            overflow: 'hidden'
                        }}
                    >
                        <div className={`bg-blue-50 rounded-xl p-4 text-center transition-transform duration-500 ease-out ${
                            amount ? 'transform translate-y-0' : 'transform -translate-y-4'
                        }`}>
                            <p className="text-sm text-blue-600 font-medium mb-1">{"You're sending"}</p>
                            <p className="text-3xl font-bold text-blue-700">
                                {formatAmount(amount)}
                            </p>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-6">
                        <InputBox
                            label="Amount (in ₹)"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '')
                                setAmount(value)
                            }}
                        />
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-2 mb-8">
                        {[100, 500, 1000, 2000].map((quickAmount) => (
                            <button
                                key={quickAmount}
                                onClick={() => setAmount(quickAmount.toString())}
                                className="py-2 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                            >
                                ₹{quickAmount}
                            </button>
                        ))}
                    </div>

                    {/* Send Button */}
                    <div className={isLoading || !amount || parseInt(amount) <= 0 ? "opacity-50 pointer-events-none" : ""}>
                        <Button 
                            label={isLoading ? "Processing..." : "Send Money"} 
                            onClick={handleSend}
                        />
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-start">
                            <svg className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-yellow-800">Security Reminder</p>
                                <p className="text-xs text-yellow-700 mt-1">
                                    {"Make sure you're sending money to the right person. Transfers cannot be reversed."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Send() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <SendContent />
        </Suspense>
    )
}