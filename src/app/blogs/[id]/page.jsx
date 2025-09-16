import React from "react";
import { MoveLeft, User, Calendar, Clock, Share2, BookOpen } from "lucide-react";
import Link from "next/link";
import Footer from "@/sections/footer/Footer";

const BlogDetailPage = async ({ params }) => {
  const { id } = await params;

  // Construct absolute URL for fetch
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  let blog = null;
  let error = null;

  try {
    const response = await fetch(`${baseUrl}/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (result.success) {
      blog = result.data;
    } else {
      error = result.message || "Failed to fetch blog";
    }
  } catch (err) {
    console.error("Error fetching blog:", err);
    error = "Failed to fetch blog";
  }

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Article Not Found</h3>
          <p className="text-slate-600 mb-8">
            {error || "The article you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-blue-800 text-white font-semibold rounded-xl hover:from-red-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <MoveLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/#blogs"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-blue-900 text-white font-semibold rounded-xl hover:from-red-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <MoveLeft className="w-5 h-5 mr-2" />
            Back to Articles
          </Link>
        </div>
      </nav>

      {blog.imageUrl && (
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={blog.imageUrl || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
      )}

      <div
        className="w-[90%] mx-auto bg-white rounded-2xl shadow-2xl relative z-10"
        style={{ marginTop: blog.imageUrl ? "-4rem" : "2rem" }}
      >
        <div className="px-8 md:px-12 pt-12 pb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight text-balance">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-blue-900 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                {/* <p className="font-bold text-slate-900 text-lg">{blog.author}</p> */}
                <p className="text-sm text-slate-500">Author</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-600">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-slate-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{calculateReadingTime(blog.content)} min read</span>
            </div>

            <div className="ml-auto">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-blue-900 text-white font-semibold rounded-xl hover:from-red-500 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Share2 className="w-5 h-5" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-12 py-12">
          <div className="prose prose-xl prose-slate max-w-none">
            <div className="text-lg md:text-xl leading-relaxed text-slate-700 space-y-8">
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-8 leading-8 text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 md:px-12 py-8 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-blue-900 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-lg">{blog.author}</span>
                  <p className="text-sm text-slate-500">Published this article</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;