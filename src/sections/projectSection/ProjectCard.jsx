import React, { useState } from 'react';
import { ExternalLink, Code2, Eye, ChevronRight, Zap, Globe, Database, Server } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Technology category icons mapping
  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react') || techLower.includes('next')) return <Globe className="w-3 h-3" />;
    if (techLower.includes('node') || techLower.includes('express')) return <Server className="w-3 h-3" />;
    if (techLower.includes('mongo') || techLower.includes('sql') || techLower.includes('postgres')) return <Database className="w-3 h-3" />;
    if (techLower.includes('aws') || techLower.includes('azure') || techLower.includes('docker')) return <Zap className="w-3 h-3" />;
    return <Code2 className="w-3 h-3" />;
  };

  // Get primary technologies (first 6)
  const primaryTechs = project.technologies?.slice(0, 6) || [];
  const remainingCount = (project.technologies?.length || 0) - 6;

  return (
    <div 
      className="relative h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container - Fixed overflow and positioning */}
      <div className={`
        relative h-full bg-white rounded-2xl shadow-lg border border-gray-200 
        transition-all duration-700 ease-out transform-gpu overflow-hidden
        ${isHovered ? 'shadow-2xl shadow-red-500/20 -translate-y-1 sm:-translate-y-2 scale-[1.01] sm:scale-[1.02]' : 'hover:shadow-xl'}
      `}>
        
        {/* Enhanced Gradient Border Effect - Fixed positioning to stay within card */}
        <div className={`
          absolute inset-[1px] rounded-2xl transition-all duration-500 z-0
          bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col bg-white rounded-2xl">
          
          {/* Image Section - Fixed button positioning */}
          <div className="relative h-48 sm:h-52 md:h-56 lg:h-48 xl:h-52 overflow-hidden rounded-t-2xl bg-gradient-to-br from-red-50 via-blue-50 to-purple-50">
            {/* Loading Placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-50">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-red-500 to-blue-500 relative">
                  <div className="absolute inset-2 rounded-full bg-white animate-spin">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Project Image */}
            <img
              src={project.image || "https://via.placeholder.com/400x300?text=Project+Image"}
              alt={project.title || "Project"}
              className={`
                w-full h-full object-cover object-center transition-all duration-700 ease-out
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                ${isHovered ? 'scale-105 brightness-110' : 'scale-100'}
              `}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              loading="lazy"
              style={{ 
                filter: isHovered ? 'contrast(1.1) saturate(1.1)' : 'contrast(1) saturate(1)',
                transition: 'all 0.7s ease-out'
              }}
            />
            
            {/* Enhanced Overlay Gradient */}
            <div className={`
              absolute inset-0 transition-all duration-500 rounded-t-2xl
              ${isHovered 
                ? 'bg-gradient-to-t from-black/70 via-red-900/20 to-blue-900/10' 
                : 'bg-gradient-to-t from-black/50 via-transparent to-transparent'
              }
            `} />
            
            {/* Floating Action Button - Fixed positioning to stay within bounds */}
            <div className={`
              absolute top-3 right-3 sm:top-4 sm:right-4 transition-all duration-500 transform z-20
              ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-1 opacity-0 scale-90'}
            `}>
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn w-8 h-8 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  if (!project.link) {
                    e.preventDefault();
                  }
                }}
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 group-hover/btn:text-white transition-colors duration-300" />
              </a>
            </div>

            {/* Project Status Badge - Fixed positioning */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
              <div className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-white">Live</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col">
            
            {/* Title */}
            <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-500">
              {project.title || "Project Title"}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-1">
              {project.description || "Project description will be displayed here."}
            </p>

            {/* Technologies Section */}
            <div className="mb-4 sm:mb-5 lg:mb-6">
              <div className="flex items-center mb-2 sm:mb-3">
                <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Tech Stack</span>
              </div>
              
              {/* Technology Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {primaryTechs.map((tech, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium
                      bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200
                      hover:from-red-50 hover:to-blue-50 hover:text-gray-800 hover:border-red-200
                      transition-all duration-300 transform hover:scale-105 hover:shadow-sm
                      ${isHovered ? 'animate-pulse' : ''}
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="hidden sm:inline-flex">{getTechIcon(tech)}</span>
                    <span className="truncate max-w-[100px] sm:max-w-none">{tech}</span>
                  </div>
                ))}
                
                {/* Remaining Count */}
                {remainingCount > 0 && (
                  <div className="flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-sm">
                    <span>+{remainingCount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
              {/* View Details */}
              <button className="group/details flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">Details</span>
                <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3 transform group-hover/details:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Live Link */}
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group/link flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                  bg-gradient-to-r from-red-500 to-blue-500 text-white text-xs sm:text-sm font-medium
                  hover:from-red-600 hover:to-blue-600 hover:shadow-lg hover:shadow-red-500/25
                  transform transition-all duration-300 hover:scale-105 active:scale-95
                  ${isHovered ? 'animate-pulse' : ''}
                `}
                onClick={(e) => {
                  if (!project.link) {
                    e.preventDefault();
                  }
                }}
              >
                <span>Live</span>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 transform group-hover/link:rotate-12 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Floating Particles (Decorative) - Fixed positioning */}
        <div className={`
          absolute inset-0 pointer-events-none transition-opacity duration-1000 overflow-hidden rounded-2xl
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full"
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

// Sample data for demonstration
const sampleProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js featuring real-time inventory management and secure payment processing.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Redis", "AWS"],
    link: "https://example.com"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and advanced analytics.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
    link: "https://example.com"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A comprehensive weather dashboard with interactive maps, forecasting, and location-based weather alerts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["Vue.js", "Python", "FastAPI", "Docker", "Chart.js"],
    link: "https://example.com"
  }
];

// Demo component to show the ProjectCard in action
const ProjectCardDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-blue-50/30 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          Project Cards Demo
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProjects.map((project) => (
            <div key={project.id} className="h-[600px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCardDemo;