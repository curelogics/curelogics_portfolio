"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  const router = useRouter()

  // Check for token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken")
    if (storedToken) {
      router.push("/admin/blogs")
    }
  }, [router])

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()
      if (result.success) {
        localStorage.setItem("adminToken", result.token)
        setError("")
        setEmail("")
        setPassword("")
        showNotification("Welcome back! Successfully logged in.", "success")
        router.push("/admin/dashboard")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Notification Component
  const Notification = ({ notification }) => {
    if (!notification) return null

    const bgColor = notification.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
    const textColor = notification.type === "success" ? "text-green-800" : "text-red-800"
    const iconColor = notification.type === "success" ? "text-green-400" : "text-red-400"

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 ${bgColor} border rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {notification.type === "success" ? (
              <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${textColor}`}>{notification.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Notification notification={notification} />
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden">
        <div className="bg-red-600 px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white text-center">Admin Portal</h1>
            <p className="text-white text-center mt-2 opacity-90">Secure access to blog management</p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your admin email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 transition-all duration-200"></div>
              <div className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center text-white">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-white">Signing In...</span>
                  </div>
                ) : (
                  <span className="text-white">Sign In to Dashboard</span>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;