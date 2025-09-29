"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoTimeOutline, IoPersonOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Custom toast system
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setJobs(result.data);
      } else {
        setError(result.message || "Failed to fetch jobs");
        showToast(result.message || "Failed to fetch jobs", "error");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch jobs");
      showToast("Failed to fetch jobs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    window.scrollTo(0, 0); // Reset to top of page
  }, []);

  // Get unique job types for categories, plus "Applied", "Open", and "Closed"
  const categories = ["View all", "Open", "Closed", ...new Set(jobs.map((job) => job.job_type))];

  // Get applied job IDs from localStorage
  const getAppliedJobs = () => {
    const applied = localStorage.getItem("appliedJobs");
    return applied ? JSON.parse(applied) : [];
  };

  // Filter jobs based on selected category
  const filteredJobs =
    selectedCategory === "View all"
      ? jobs
      : selectedCategory === "Applied"
      ? jobs.filter((job) => getAppliedJobs().includes(job._id))
      : selectedCategory === "Open" || selectedCategory === "Closed"
      ? jobs.filter((job) => job.job_status === selectedCategory)
      : jobs.filter((job) => job.job_type === selectedCategory);

  // Handle Apply click to store job ID
  const handleApplyClick = (jobId, jobTitle) => {
    const appliedJobs = getAppliedJobs();
    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    }
    localStorage.setItem("jobTitle", jobTitle);
  };

  return (
    <div className="w-full z-10 relative mt-20 overflow-hidden">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[60] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 transform translate-x-0 ${
              toast.type === "success"
                ? "bg-white border-gray-200 text-black"
                : "bg-red-100 border-red-200 text-black"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  toast.type === "success" ? "bg-red-500" : "bg-blue-800"
                }`}
              />
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Header Section */}
      <div className="relative h-full mx-auto rounded-lg backdrop-blur-2xl z-30 p-3 lg:p-12 bg-white">
        <div className="w-full max-w-7xl mx-auto lg:text-start text-center py-12">
          <span className="p-1 px-2 text-black border rounded-full mb-2 inline-block bg-white">
            We're hiring!
          </span>
          <h1 className="text-2xl md:text-5xl font-bold text-black">
            Be Part of Our Mission
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We’re looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility.
          </p>
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border font-medium transition cursor-pointer ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-red-500 to-blue-900 text-white"
                    : "bg-white text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full max-w-7xl mx-auto overflow-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-black font-medium">{error}</p>
              <button
                onClick={fetchJobs}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-blue-800 text-white rounded-lg transition cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoPersonOutline className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">No Jobs Found</h3>
              <p className="text-gray-600">No jobs available for the "{selectedCategory}" category.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="p-6 border-b shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-bold text-black">{job.title}</h3>
                    <Link
                      onClick={() => handleApplyClick(job._id, job.title)}
                      href={`/career/apply?jobId=${job._id}`}
                      className="text-blue-500 font-medium hover:underline flex items-center gap-2"
                    >
                      Apply Now
                      <FaArrowRight className="-rotate-45" />
                    </Link>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium text-black bg-red-100 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1 ${
                          job.job_type === "Onsite"
                            ? "bg-blue-100 text-blue-800"
                            : job.job_type === "Remote"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-teal-100 text-teal-800"
                        }`}
                      >
                        <IoLocationOutline />
                        {job.job_type}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1 ${
                          job.job_status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <IoTimeOutline />
                        {job.job_status}
                      </span>
                      <span className="px-3 py-1 text-sm font-medium text-black bg-red-100 rounded-full flex items-center gap-1">
                        <IoPersonOutline />
                        {job.seats} {job.seats === 1 ? "Seat" : "Seats"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Button */}
        <div className="text-center mt-12 md:text-end max-w-7xl mx-auto">
          <Link
            href="/contact"
            className="px-6 py-3 cursor-pointer text-white text-sm md:text-base bg-gradient-to-r from-red-500 to-blue-900 hover:opacity-90 rounded-lg shadow-md"
          >
            Get in Touch →
          </Link>
        </div>
      </div>
      <div className="w-40 h-40 -z-30 bg-gradient-to-r from-red-500 to-blue-900 rounded-full absolute top-0 right-0"></div>
    </div>
  );
};

export default CareerPage;