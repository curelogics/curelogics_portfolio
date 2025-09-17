"use client";
import React, { useState, useEffect } from "react";
import { User, Calendar, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";
import Heading from "@/components/globalcomponents/Heading";

const BlogCard = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Truncate text for preview
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div
      className="relative h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative h-full bg-white rounded-2xl shadow-lg border border-gray-200 
          transition-all duration-700 ease-out transform-gpu overflow-hidden
          ${isHovered ? "shadow-2xl shadow-red-500/20 -translate-y-1 sm:-translate-y-2 scale-[1.01] sm:scale-[1.02]" : "hover:shadow-xl"}
        `}
      >
        {/* Gradient Border Effect */}
        <div
          className={`
            absolute inset-[1px] rounded-2xl transition-all duration-500 z-0
            bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col bg-white rounded-2xl">
          {/* Image Section */}
          <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-red-50 via-blue-50 to-purple-50">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-50">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-red-600 to-blue-900 relative">
                  <div className="absolute inset-2 rounded-full bg-white animate-spin">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            )}
            <img
              src={blog.imageUrl || "https://via.placeholder.com/400x300?text=Blog+Image"}
              alt={blog.title || "Blog"}
              className={`
                w-full h-full object-cover object-center transition-all duration-700 ease-out
                ${imageLoaded ? "opacity-100" : "opacity-0"}
                ${isHovered ? "scale-105 brightness-110" : "scale-100"}
              `}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              loading="lazy"
              style={{
                filter: isHovered ? "contrast(1.1) saturate(1.1)" : "contrast(1) saturate(1)",
                transition: "all 0.7s ease-out",
              }}
            />
            <div
              className={`
                absolute inset-0 transition-all duration-500 rounded-t-2xl
                ${isHovered
                  ? "bg-gradient-to-t from-black/70 via-red-900/20 to-blue-900/10"
                  : "bg-gradient-to-t from-black/50 via-transparent to-transparent"
                }
              `}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col">
            <Link href={`/blogs/${blog._id}`}>
              <h3
                className={`
                  text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight
                  group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-600
                  group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-500 hover:cursor-pointer
                `}
              >
                {blog.title || "Blog Title"}
              </h3>
            </Link>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 line-clamp-3">
              {truncateText(blog.content || "Blog content will be displayed here.")}
            </p>

            {/* Metadata Section */}
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {blog.author || "Unknown Author"}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <Link
                href={`/blogs/${blog._id}`}
                className="group/details flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">Read More</span>
                <ChevronRight
                  className="w-2 h-2 sm:w-3 sm:h-3 transform group-hover/details:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Particles (Decorative) */}
        <div
          className={`
            absolute inset-0 pointer-events-none transition-opacity duration-1000 overflow-hidden rounded-2xl
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-red-600 to-blue-900 rounded-full"
              style={{
                left: `${25 + i * 20}%`,
                top: `${40 + i * 15}%`,
                animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 300}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch popular blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?popular=true");
        const result = await response.json();
        if (result.success) {
          setBlogs(result.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-red-50/30 to-blue-50/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-red-600 to-blue-900 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full bg-gradient-to-r from-red-600 to-blue-900"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="relative">
            {/* <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight">
              Our Popular Blogs
            </h2> */}
            <Heading text={"Our Popular Blogs"} />
          </div>
          <p className="text-xl lg:text-3xl text-gray-900 max-w-3xl mx-auto leading-relaxed font-semibold">
            Explore our most popular insights and stories
            <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent font-semibold"> crafted with passion</span>
          </p>
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-32"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-red-600 to-blue-900 rounded-full mx-4"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-32"></div>
          </div>
        </div>

        {/* Blog Grid */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M19 11H5m14-7H5m14 14H5"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
            <p className="text-gray-600 mb-6">Check back soon for our latest posts.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog._id} className="h-[450px]">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
            {blogs.length >= 3 && (
              <div className="text-center mt-12">
                <Link
                  href="/blogs"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-blue-900 text-white font-medium rounded-full hover:from-red-500 hover:to-blue-800 transition-all duration-300"
                >
                  View More Blogs
                  <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;