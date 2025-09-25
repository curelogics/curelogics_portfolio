'use client';
import React from 'react';
import { FileText, Briefcase, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, handleSignOut }) {
  return (
    <div className="w-64 bg-white text-gray-900 h-screen fixed shadow-lg border-r border-gray-100">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <span>Admin Dashboard</span>
        </h1>
      </div>
      <nav className="mt-4">
        <button
          className={`w-full flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-all duration-200 ${
            activeTab === 'blogs'
              ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('blogs')}
        >
          <FileText size={20} />
          <span>Blogs</span>
        </button>
        <button
          className={`w-full flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-all duration-200 ${
            activeTab === 'jobs'
              ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('jobs')}
        >
          <Briefcase size={20} />
          <span>Jobs</span>
        </button>
        <button
          className="w-full flex items-center space-x-3 px-6 py-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          onClick={handleSignOut}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}