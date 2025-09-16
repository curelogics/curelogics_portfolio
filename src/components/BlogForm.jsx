"use client"
import { useState, useEffect } from "react"

const BlogForm = ({ token, editingBlog, setEditingBlog, refreshBlogs }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  // Populate form when editing
  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title)
      setContent(editingBlog.content)
      setAuthor(editingBlog.author)
      setImage(null)
      setImagePreview(editingBlog.imageUrl || null)
    } else {
      setTitle("")
      setContent("")
      setAuthor("")
      setImage(null)
      setImagePreview(null)
    }
    setError("")
    setSuccess("")
  }, [editingBlog])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(editingBlog?.imageUrl || null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("author", author)
    if (image) formData.append("image", image)
    if (editingBlog) formData.append("id", editingBlog._id)

    try {
      const url = "/api/blogs"
      const method = editingBlog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await response.json()
      if (result.success) {
        setTitle("")
        setContent("")
        setAuthor("")
        setImage(null)
        setImagePreview(null)
        setEditingBlog(null)
        setSuccess(editingBlog ? "Blog updated successfully!" : "Blog created successfully!")
        refreshBlogs()

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError(result.message || "Failed to submit blog")
      }
    } catch (error) {
      setError("Failed to submit blog. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setAuthor("")
    setImage(null)
    setImagePreview(null)
    setEditingBlog(null)
    setError("")
    setSuccess("")
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-8 py-6 border-b border-gray-200">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>
        <p className="text-gray-600 mt-2">
          {editingBlog ? "Update your blog post with new information" : "Share your thoughts with the world"}
        </p>
      </div> */}

      <div className="p-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              placeholder="Enter an engaging blog title..."
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Author Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              placeholder="Enter author name..."
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
              placeholder="Write your blog content here..."
              rows="4"
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500">{content.length} characters</p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">Featured Image</label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-red-50 file:to-blue-50 file:text-gray-700 hover:file:bg-gradient-to-r hover:file:from-red-100 hover:file:to-blue-100"
                disabled={isSubmitting}
              />
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border border-gray-200"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null)
                        setImagePreview(null)
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 px-8 bg-gradient-to-r from-red-600 to-blue-800 hover:from-red-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
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
                  {editingBlog ? "Updating..." : "Creating..."}
                </div>
              ) : editingBlog ? (
                "Update Blog Post"
              ) : (
                "Create Blog Post"
              )}
            </button>

            {editingBlog && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none py-4 px-8 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogForm;

