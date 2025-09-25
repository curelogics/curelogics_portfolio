'use client';
import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3, Trash2, Eye, Calendar, MousePointer, User, Image as ImageIcon } from 'lucide-react';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    author: '',
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Custom toast system
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      const result = await response.json();
      if (result.success) {
        setBlogs(result.data);
      } else {
        showToast(result.message || 'Failed to fetch blogs', 'error');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showToast('Failed to fetch blogs', 'error');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('author', formData.author);
    if (formData.image) data.append('image', formData.image);
    if (isEditing) data.append('id', formData.id);

    try {
      const url = isEditing ? '/api/blogs/update' : '/api/blogs/create';
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        showToast(isEditing ? 'Blog updated successfully' : 'Blog created successfully');
        fetchBlogs();
        resetForm();
        setIsModalOpen(false);
      } else {
        showToast(result.message || 'Failed to submit blog', 'error');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      showToast('Failed to submit blog', 'error');
    }
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/blogs/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) {
        showToast('Blog deleted successfully');
        fetchBlogs();
      } else {
        showToast(result.message || 'Failed to delete blog', 'error');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      showToast('Failed to delete blog', 'error');
    }
  };

  // Handle edit button click
  const handleEdit = (blog) => {
    setFormData({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      image: null,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: '', title: '', content: '', author: '', image: null });
    setIsEditing(false);
  };

  // View blog details
  const viewDetails = (blog) => {
    setSelectedBlog(blog);
  };

  // Open create modal
  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Toast Container */}
      <div className="fixed top-4 right-4 z-[60] space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300 transform translate-x-0 ${
              toast.type === 'success' 
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' 
                : 'bg-red-50/90 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Dashboard</h1>
              <p className="text-gray-600">Manage your blog posts and content</p>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              <span className="font-medium">Create Blog</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.reduce((sum, blog) => sum + blog.clickCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.length > 0 ? Math.round(blogs.reduce((sum, blog) => sum + blog.clickCount, 0) / blogs.length) : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {blog.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MousePointer size={14} />
                    <span>{blog.clickCount} views</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewDetails(blog)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"
                      title="Edit Blog"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Blog"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first blog post</p>
            <button
              onClick={openCreateModal}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Create Your First Blog
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Update Blog Post' : 'Create New Blog Post'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Blog Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter an engaging title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Author name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  rows="6"
                  placeholder="Write your blog content here..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Featured Image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    accept="image/*"
                  />
                  <ImageIcon className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isEditing ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {selectedBlog.imageUrl && (
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img 
                    src={selectedBlog.imageUrl} 
                    alt={selectedBlog.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
              
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 rounded-xl transition-all duration-200 hover:bg-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedBlog.title}</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span className="font-medium">{selectedBlog.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(selectedBlog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MousePointer size={16} />
                    <span>{selectedBlog.clickCount} views</span>
                  </div>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedBlog.content}
                </p>
              </div>
              
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;