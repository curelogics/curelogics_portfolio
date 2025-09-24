import React, { useRef, useState, useEffect } from "react";
import { MoveLeft, MoveRight, Sparkles } from "lucide-react";
import { ExternalLink, Code2, Eye, ChevronRight, Zap, Globe, Database, Server } from 'lucide-react';

// ProjectCard Component
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
  const remainingCount = Math.max(0, (project.technologies?.length || 0) - 6);

  return (
    <div
      className="relative h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative h-full bg-white rounded-2xl shadow-lg border border-gray-200 
        transition-all duration-700 ease-out transform-gpu overflow-hidden
        ${isHovered ? 'shadow-2xl shadow-red-500/20 -translate-y-1 sm:-translate-y-2 scale-[1.01] sm:scale-[1.02]' : 'hover:shadow-xl'}
      `}>
        <div className={`
          absolute inset-[1px] rounded-2xl transition-all duration-500 z-0
          bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
        <div className="relative z-10 h-full flex flex-col bg-white rounded-2xl">
          <div className="relative h-48 sm:h-52 md:h-56 lg:h-48 xl:h-52 overflow-hidden rounded-t-2xl bg-gradient-to-br from-red-50 via-blue-50 to-purple-50">
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
            <div className={`
              absolute inset-0 transition-all duration-500 rounded-t-2xl
              ${isHovered
                ? 'bg-gradient-to-t from-black/70 via-red-900/20 to-blue-900/10'
                : 'bg-gradient-to-t from-black/50 via-transparent to-transparent'
              }
            `} />
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
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
              <div className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-white">Live</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col">
            <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-500">
              {project.title || "Project Title"}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-1 line-clamp-3 flex-1">
              {project.description || "Project description will be displayed here."}
            </p>
            <div className="mb-2">
              <div className="flex items-center">
                <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Tech Stack</span>
              </div>
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
                {remainingCount > 0 && (
                  <div className="flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-sm">
                    <span>+{remainingCount}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
              <button className="group/details flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">Details</span>
                <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3 transform group-hover/details:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group/link flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                  bg-gradient-to-r from-red-600 to-blue-900 text-white text-xs sm:text-sm font-medium
                  hover:from-red-500 hover:to-blue-800 hover:shadow-lg hover:shadow-red-500/25
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
        <div className={`
          absolute inset-0 pointer-events-none transition-opacity duration-1000 overflow-hidden rounded-2xl
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
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

// Sample projects data
const sampleProjects = [
  {
    id: 1,
    title: "videotest.testrtc.com",
    description: "WebRTC testing tool for real-time video and audio quality checks, enabling 10K+ monthly test sessions with detailed performance metrics and diagnostics.",
    image: "/images/testrtc.png",
    technologies: ["React", "Node.js", "WebRTC", "AWS"],
    link: "https://videotest.testrtc.com"
  },
  {
    id: 2,
    title: "orijin.io",
    description: "Agriculture platform for farm management, digital payments, and EUDR compliance, supporting 100K+ farm records and transactions with real-time insights.",
    image: "/images/orijin.png",
    technologies: ["Express.js", "React", "Node.js", "MongoDB", "TypeScript"],
    link: "https://orijin.io"
  },
  {
    id: 3,
    title: "AI Markdown Editor",
    description: "Collaborative WYSIWYG Markdown editor with AI integration, enabling seamless real-time editing for 5K+ concurrent users and intelligent content suggestions.",
    image: "/images/tiptap.png",
    technologies: ["Tiptap", "Yjs", "Next.js", "RAG", "Hocus Pocus"],
    link: "https://example.com"
  },
  {
    id: 4,
    title: "hellosenseai.com",
    description: "AI receptionist for small businesses, handling 1M+ customer calls and messages monthly with automated scheduling, messaging, and CRM integration.",
    image: "/images/hellosenseai.png",
    technologies: ["Lovable", "Supabase", "FastAPI", "Next.js", "VAPI"],
    link: "https://hellosenseai.com"
  },
  {
    id: 5,
    title: "AI Voice Chatbot/Agent",
    description: "Automated AI voice assistant for financial institutions, processing 100K+ voice queries monthly with natural speech synthesis and advanced workflows.",
    image: "/images/ChatBot.png",
    technologies: ["Node.js", "VAPI", "n8n", "ElevenLabs", "SDKs", "RAG"],
    link: "https://example.com"
  },
  {
    id: 6,
    title: "docus.ai",
    description: "Medical AI platform offering health assistant, AI doctor, and lab test interpretation, serving 500K+ patients worldwide with secure, scalable infrastructure.",
    image: "/images/docusai.png",
    technologies: ["Next.js", "Node.js", "Vercel", "AI Integrations"],
    link: "https://docus.ai"
  },
  {
    id: 7,
    title: "qiyas.pro",
    description: "Quiz platform with multilingual support and admin dashboards, powering 50K+ quizzes completed monthly with real-time analytics and user management.",
    image: "/images/qiyaspro.png",
    technologies: ["Loveable", "Next.js", "Supabase"],
    link: "https://qiyas.pro"
  },
  {
    id: 8,
    title: "Crypto Arbitrage Bot",
    description: "Low-latency trading bot executing 1K+ daily arbitrage trades with MetaMask/Phantom login, real-time order book syncing, and adaptive cross-exchange strategies.",
    image: "/images/arbitrage.png",
    technologies: ["Node.js", "Express.js", "Socket.IO", "CCXT Pro"],
    link: "https://example.com"
  }
];

// Custom Swiper Implementation with Circular Looping
const CustomSwiper = ({ children, autoplay = true, spaceBetween = 30, onSlideChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(autoplay);
  const containerRef = useRef(null);
  const totalSlides = React.Children.count(children);
  const extendedSlides = [...children, ...children.slice(0, 3)]; // Duplicate first 3 slides for seamless looping
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Autoplay functionality with circular looping
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const nextSlide = prev + 1;
        if (nextSlide >= totalSlides) {
          setTimeout(() => {
            containerRef.current.style.transition = 'none';
            setCurrentSlide(0);
          }, 500);
          return nextSlide;
        }
        return nextSlide;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoplay, totalSlides]);

  // Reset transition after jump to start
  useEffect(() => {
    if (currentSlide === 0 && containerRef.current) {
      setTimeout(() => {
        containerRef.current.style.transition = 'transform 0.5s ease-out';
      }, 50);
    }
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index % totalSlides);
    if (onSlideChange) onSlideChange(index % totalSlides);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => {
      const nextSlide = prev + 1;
      if (nextSlide >= totalSlides) {
        setTimeout(() => {
          containerRef.current.style.transition = 'none';
          setCurrentSlide(0);
        }, 500);
        return nextSlide;
      }
      return nextSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide(prev => {
      const prevSlide = prev - 1;
      if (prevSlide < 0) {
        setTimeout(() => {
          containerRef.current.style.transition = 'none';
          setCurrentSlide(totalSlides - 1);
        }, 500);
        return totalSlides - 1;
      }
      return prevSlide;
    });
  };

  const slideWidth = `${100 / slidesPerView}%`;
  const translateX = -(currentSlide * (100 / slidesPerView));

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(autoplay)}
    >
      <div
        ref={containerRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {extendedSlides.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-2"
            style={{ width: slideWidth }}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="swiper-navigation" style={{ display: 'none' }}>
        <button onClick={prevSlide} data-action="prev" />
        <button onClick={nextSlide} data-action="next" />
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    const prevBtn = swiperRef.current?.querySelector('[data-action="prev"]');
    if (prevBtn) {
      prevBtn.click();
    }
  };

  const handleNext = () => {
    const nextBtn = swiperRef.current?.querySelector('[data-action="next"]');
    if (nextBtn) {
      nextBtn.click();
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-red-50/30 to-blue-50/30 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-red-600 to-blue-900 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-r from-red-600 to-blue-900"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="relative">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-blue-900 bg-clip-text text-transparent mb-4 leading-tight">
              Our Projects
            </h2>
          </div>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover our portfolio of innovative solutions that transform ideas into
            <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent font-semibold"> extraordinary digital experiences</span>
          </p>
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-32"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-red-600 to-blue-900 rounded-full mx-4"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-32"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-12">
          <div className="hidden lg:flex items-center space-x-4">
            <div className="h-px bg-gradient-to-r from-red-600 to-blue-900 w-20"></div>
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Portfolio Showcase</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              className="group relative w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center transition-all duration-300 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-1"
              aria-label="Previous slide"
            >
              <MoveLeft className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-blue-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            <div className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-600 to-blue-900 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-400"></div>
              </div>
              <span className="text-xs font-medium text-gray-600 ml-2">Slide Navigation</span>
            </div>
            <button
              onClick={handleNext}
              className="group relative w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
              aria-label="Next slide"
            >
              <MoveRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-blue-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
        <div className="relative">
          <div ref={swiperRef} className="lg:h-[48rem] w-full pb-12">
            <CustomSwiper
              autoplay={true}
              spaceBetween={30}
              onSlideChange={setCurrentSlide}
            >
              {sampleProjects.map((project, index) => (
                <div key={project.id || index} className="h-full pb-6">
                  <div className="h-[600px]">
                    <ProjectCard project={project} />
                  </div>
                </div>
              ))}
            </CustomSwiper>
          </div>
        </div>
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-600 to-blue-900"></div>
              <span className="text-sm font-semibold text-gray-700">{sampleProjects.length} Projects</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <span className="text-sm text-gray-600">Swipe to explore more</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;