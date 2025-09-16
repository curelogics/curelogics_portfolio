"use client"
import { useState, useEffect } from "react"
import BlogForm from "@/components/BlogForm"

const AdminBlogsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [token, setToken] = useState("")
  const [blogs, setBlogs] = useState([])
  const [editingBlog, setEditingBlog] = useState(null)
  const [activeTab, setActiveTab] = useState("blogs")
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [notification, setNotification] = useState(null)

  // Check for token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      fetchBlogs(storedToken)
    }
  }, [])

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // Fetch blogs
  const fetchBlogs = async (authToken) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/blogs", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      const result = await response.json()
      if (result.success) {
        setBlogs(result.data)
      } else {
        showNotification("Failed to fetch blogs", "error")
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
      showNotification("Failed to fetch blogs", "error")
    } finally {
      setIsLoading(false)
    }
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
        setToken(result.token)
        localStorage.setItem("adminToken", result.token)
        setIsAuthenticated(true)
        setError("")
        setEmail("")
        setPassword("")
        fetchBlogs(result.token)
        showNotification("Welcome back! Successfully logged in.", "success")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setToken("")
    setIsAuthenticated(false)
    setBlogs([])
    setEditingBlog(null)
    setActiveTab("blogs")
    setError("")
    showNotification("Successfully logged out", "success")
  }

  // Start editing a blog
  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setActiveTab("form")
  }

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/blogs", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      const result = await response.json()
      if (result.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id))
        showNotification("Blog deleted successfully!", "success")
      } else {
        showNotification(result.message || "Failed to delete blog", "error")
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
      showNotification("Failed to delete blog", "error")
    } finally {
      setDeleteConfirm(null)
    }
  }

  // Truncate text for preview
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + "..."
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

  // Delete Confirmation Modal
  const DeleteConfirmModal = ({ blog, onConfirm, onCancel }) => {
    if (!blog) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Blog Post</h3>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "{blog.title}"? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onConfirm(blog._id)}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Delete
            </button>
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Notification notification={notification} />
      <DeleteConfirmModal blog={deleteConfirm} onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} />

      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-80 bg-white shadow-xl border-r border-gray-200 min-h-screen flex flex-col">
          <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-red-50 to-blue-50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent">
              Blog Dashboard
            </h2>
            <p className="text-gray-600 mt-2">Manage your content</p>
          </div>

          <nav className="p-6 space-y-3 flex-1">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full text-left py-4 px-6 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "blogs"
                  ? "bg-gradient-to-r from-red-100 to-blue-100 text-gray-900 shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14-7H5m14 14H5" />
                </svg>
                View All Blogs
                <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{blogs.length}</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("form")
                setEditingBlog(null)
              }}
              className={`w-full text-left py-4 px-6 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "form"
                  ? "bg-gradient-to-r from-red-100 to-blue-100 text-gray-900 shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Create New Blog
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-blue-800 hover:from-red-500 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {activeTab === "form" ? (editingBlog ? "Edit Blog Post" : "Create New Blog") : "Blog Management"}
              </h1>
              <p className="text-gray-600">
                {activeTab === "form"
                  ? editingBlog
                    ? "Update your existing blog post"
                    : "Share your thoughts with the world"
                  : "Manage and organize your blog content"}
              </p>
            </div>

            {/* Content */}
            {activeTab === "form" && (
              <BlogForm
                token={token}
                editingBlog={editingBlog}
                setEditingBlog={setEditingBlog}
                refreshBlogs={() => fetchBlogs(token)}
              />
            )}

            {activeTab === "blogs" && (
              <div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="animate-spin h-8 w-8 text-blue-600"
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
                      <span className="text-gray-600 font-medium">Loading blogs...</span>
                    </div>
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-16">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14-7H5m14 14H5" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
                    <p className="text-gray-600 mb-6">Get started by creating your first blog post.</p>
                    <button
                      onClick={() => {
                        setActiveTab("form")
                        setEditingBlog(null)
                      }}
                      className="py-3 px-6 bg-gradient-to-r from-red-600 to-blue-800 hover:from-red-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
                    >
                      Create Your First Blog
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                      >
                        {blog.imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={blog.imageUrl || "/placeholder.svg"}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        )}

                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{truncateText(blog.content)}</p>
                          </div>

                          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              {blog.author}
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(blog)}
                              className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBlogsPage;
