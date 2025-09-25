'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import BlogManager from '@/components/admin/BlogManager';
import JobManager from '@/components/admin/JobManager';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleSignOut={handleSignOut} />
      <div className="flex-1 ml-64 p-6">
        {activeTab === 'blogs' && <BlogManager />}
        {activeTab === 'jobs' && <JobManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;