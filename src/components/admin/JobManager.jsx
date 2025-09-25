'use client';
import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3, Trash2, Eye, Calendar, MousePointer, Briefcase } from 'lucide-react';

const JobManager = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    job_type: '',
    job_status: '',
    skills: [],
    seats: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');

  // Custom toast system
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      const result = await response.json();
      if (result.success) {
        setJobs(result.data);
      } else {
        showToast(result.message || 'Failed to fetch jobs', 'error');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      showToast('Failed to fetch jobs', 'error');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle skill input
  const handleSkillInput = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }));
      setCurrentSkill('');
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Clear skill input
  const clearSkillInput = () => {
    setCurrentSkill('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('job_type', formData.job_type);
    data.append('job_status', formData.job_status);
    data.append('skills', JSON.stringify(formData.skills));
    data.append('seats', formData.seats);
    if (isEditing) data.append('id', formData.id);

    try {
      const url = isEditing ? '/api/jobs/update' : '/api/jobs/create';
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        showToast(isEditing ? 'Job updated successfully' : 'Job created successfully');
        fetchJobs();
        resetForm();
        setIsModalOpen(false);
      } else {
        showToast(result.message || 'Failed to submit job', 'error');
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      showToast('Failed to submit job', 'error');
    }
  };

  // Handle job deletion
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch('/api/jobs/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
          body: JSON.stringify({ id }),
        });
        const result = await response.json();
        if (result.success) {
          showToast('Job deleted successfully');
          fetchJobs();
        } else {
          showToast(result.message || 'Failed to delete job', 'error');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        showToast('Failed to delete job', 'error');
      }
    }
  };

  // Handle edit button click
  const handleEdit = (job) => {
    setFormData({
      id: job._id,
      title: job.title,
      description: job.description,
      job_type: job.job_type,
      job_status: job.job_status,
      skills: job.skills || [],
      seats: job.seats,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      job_type: '',
      job_status: '',
      skills: [],
      seats: '',
    });
    setIsEditing(false);
    setCurrentSkill('');
  };

  // View job details
  const viewDetails = (job) => {
    setSelectedJob(job);
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Dashboard</h1>
              <p className="text-gray-600">Manage your job postings and applications</p>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              <span className="font-medium">Create Job</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Seats</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobs.reduce((sum, job) => sum + (parseInt(job.seats) || 0), 0)}
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
                <p className="text-gray-600 text-sm font-medium">Avg. Seats</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobs.length > 0 ? Math.round(jobs.reduce((sum, job) => sum + (parseInt(job.seats) || 0), 0) / jobs.length) : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{job.title}</h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Briefcase size={14} />
                    <span>{job.job_type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MousePointer size={14} />
                    <span>{job.seats} seats</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewDetails(job)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"
                      title="Edit Job"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Job"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first job posting</p>
            <button
              onClick={openCreateModal}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Create Your First Job
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Update Job Posting' : 'Create New Job Posting'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter job title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Seats</label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Number of seats"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  rows="4"
                  placeholder="Describe the job..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Job Type</label>
                  <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Job Status</label>
                  <select
                    name="job_status"
                    value={formData.job_status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Skills Required</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleSkillInput}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Type a skill and press Enter..."
                  />
                  {currentSkill && (
                    <button
                      type="button"
                      onClick={clearSkillInput}
                      className="px-3 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isEditing ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 rounded-xl transition-all duration-200 hover:bg-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedJob.title}</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <Briefcase size={16} />
                    <span className="font-medium">{selectedJob.job_type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(selectedJob.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MousePointer size={16} />
                    <span>{selectedJob.seats} seats</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedJob.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Job Type</p>
                    <p className="text-gray-700">{selectedJob.job_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Status</p>
                    <p className="text-gray-700">{selectedJob.job_status}</p>
                  </div>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{selectedJob.description}</p>
              </div>
              
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
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

export default JobManager;