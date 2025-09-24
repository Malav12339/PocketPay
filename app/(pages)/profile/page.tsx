"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { User, Mail, CreditCard, CheckCircle, AlertCircle, ArrowLeft, Save } from "lucide-react"

function Update() {
  const { data: session, update: updateSession } = useSession()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", content: "" })
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize form with session data
  useEffect(() => {
    if (session?.user) {
      const initialData = {
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        email: session.user.email || ""
      }
      setFormData(initialData)
    }
  }, [session])

  // Check for changes
  useEffect(() => {
    if (session?.user) {
      const changed = 
        formData.firstName !== (session.user.firstName || "") ||
        formData.lastName !== (session.user.lastName || "") ||
        formData.email !== (session.user.email || "")
      setHasChanges(changed)
    }
  }, [formData, session])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear messages when user starts typing
    if (message.content) {
      setMessage({ type: "", content: "" })
    }
  }

  const handleSubmit = async () => {
    if (!hasChanges) {
      setMessage({ type: "info", content: "No changes to save" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await fetch("/api/v1/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", content: "Profile updated successfully!" });

        // Refresh session (Step 2)
        await updateSession({ trigger: "update" });

        setHasChanges(false);
      } else {
        setMessage({ type: "error", content: data.message || "Failed to update profile" });
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage({ type: "error", content: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };



  const handleCancel = () => {
    if (session?.user) {
      setFormData({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        email: session.user.email || ""
      })
      setHasChanges(false)
      setMessage({ type: "", content: "" })
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please log in to update your profile.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 cursor-pointer" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
              <p className="text-sm text-gray-600">Manage your account information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {session.user.firstName} {session.user.lastName}
                </h3>
                <p className="text-gray-600 mb-4">{session.user.email}</p>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Wallet Balance</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700">
                    ₹{session.user.balance?.toLocaleString() || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-600">Update your account details below</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Message Display */}
                {message.content && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 ${
                    message.type === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : message.type === 'error'
                      ? 'bg-red-50 border border-red-200 text-red-800'
                      : 'bg-blue-50 border border-blue-200 text-blue-800'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span className="font-medium">{message.content}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={!hasChanges || isLoading}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!hasChanges || isLoading}
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Helper Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Security Notice</p>
                      <p>Your wallet balance and transaction history remain secure when updating profile information. Only basic account details can be modified here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update