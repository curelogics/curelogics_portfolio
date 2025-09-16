"use client";
import AboutSection from "@/sections/aboutSection/AboutSection";
import Banner from "@/sections/banner/Banner";
import ContactForm from "@/sections/contact/ContactForm";
import FAQs from "@/sections/fags/FAQs";
import Footer from "@/sections/footer/Footer";
import HeroSection from "@/sections/heroSection/HeroSection";
import LogoBar from "@/sections/logobar/LogoBar";
import Navbar from "@/sections/navbar/Navbar";
import FeatureSection from "@/sections/projectSection/featuredProject";
import ProjectsSection from "@/sections/projectSection/ProjectSection";
import ServiceSection from "@/sections/serviseSection/ServiseSection";
import TeamMembers from "@/sections/teamMember/TeamMembers";
import ToolTechnologies from "@/sections/technologyies/ToolTechnologies";
import TestimonialsSection from "@/sections/testimonials/Testimonials";
import WhyCureLogics from "@/sections/whycurelogics/WhyCurelogics";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import BlogSection from "@/sections/blogsSection/BlogsSection";

// Preloader Component
const Preloader = ({ onComplete, isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState("initializing");
  const [fadeOut, setFadeOut] = useState(false);

  const completeLoading = useCallback(() => {
    setFadeOut(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        onComplete();
      }, 400);
    });
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) return;

    let isCancelled = false;

    const simulateRealisticLoading = async () => {
      try {
        setLoadingStage("initializing");
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (isCancelled) return;
        setProgress(20);

        setLoadingStage("loading-assets");
        const criticalResources = [
          new Promise((resolve) => {
            const img = new window.Image();
            img.onload = img.onerror = resolve;
            img.src = "/images/fulllogo.png";
          }),
          new Promise((resolve) => setTimeout(resolve, 400)),
          new Promise((resolve) => setTimeout(resolve, 200)),
        ];

        const resourcePromises = criticalResources.map((promise, index) =>
          promise.then(() => {
            if (!isCancelled) {
              setProgress((prev) => Math.min(prev + 15, 60));
            }
          })
        );

        await Promise.all(resourcePromises);
        if (isCancelled) return;

        setLoadingStage("hydrating");
        await new Promise((resolve) => setTimeout(resolve, 400));
        if (isCancelled) return;
        setProgress(85);

        setLoadingStage("finalizing");
        const finalProgress = setInterval(() => {
          if (isCancelled) {
            clearInterval(finalProgress);
            return;
          }

          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(finalProgress);
              completeLoading();
              return 100;
            }
            return prev + Math.random() * 5 + 2;
          });
        }, 100);

        return () => {
          clearInterval(finalProgress);
        };
      } catch (error) {
        console.warn("Preloader error:", error);
        completeLoading();
      }
    };

    simulateRealisticLoading();

    return () => {
      isCancelled = true;
    };
  }, [isVisible, completeLoading]);

  if (!isVisible) return null;

  const getLoadingText = () => {
    switch (loadingStage) {
      case "initializing":
        return "Initializing...";
      case "loading-assets":
        return "Loading assets...";
      case "hydrating":
        return "Preparing content...";
      case "finalizing":
        return "Almost ready...";
      default:
        return "Loading...";
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-400 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        willChange: "opacity",
        visibility: fadeOut ? "hidden" : "visible",
      }}
      aria-hidden="true"
      role="presentation"
    >
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(253, 3, 3, 0.1) 29%, rgba(41, 34, 195, 0.1) 100%)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center justify-center space-y-8 max-w-sm mx-auto px-4">
        <div className="relative" role="img" aria-label="CureLogics Logo Loading">
          <div className="absolute inset-0 w-32 h-32 -m-4" aria-hidden="true">
            <div
              className="w-full h-full rounded-full border-4 border-transparent"
              style={{
                borderTopColor: "rgba(253, 3, 3, 0.8)",
                borderRightColor: "rgba(41, 34, 195, 0.8)",
                animation: "spin 2s linear infinite",
                transform: "translateZ(0)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 w-24 h-24 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(253, 3, 3, 0.1) 29%, rgba(41, 34, 195, 0.1) 100%)",
              animation: "pulse 1.5s ease-in-out infinite",
              transform: "translateZ(0)",
            }}
            aria-hidden="true"
          />
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="relative w-20 h-20">
              <Image
                src="/images/fulllogo.png"
                alt="CureLogics - Digital Solutions Agency"
                fill
                className="object-contain"
                style={{
                  animation: "pulse 1.5s ease-in-out infinite",
                  transform: "translateZ(0)",
                }}
                priority
                sizes="80px"
                quality={90}
              />
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1
            className="text-3xl font-bold tracking-wider"
            style={{
              background:
                "linear-gradient(135deg, rgba(253, 3, 3, 1) 29%, rgba(41, 34, 195, 1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CURELOGICS
          </h1>
          <p className="text-gray-600 text-sm font-medium tracking-wide">
            Digital Solutions Agency
          </p>
        </div>

        <div
          className="w-full max-w-xs space-y-3"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background:
                  "linear-gradient(90deg, rgba(253, 3, 3, 1) 29%, rgba(41, 34, 195, 1) 100%)",
                willChange: "width",
                transform: "translateZ(0)",
              }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span className="font-medium" aria-live="polite">
              {getLoadingText()}
            </span>
            <span className="font-mono tabular-nums">
              {Math.round(Math.min(progress, 100))}%
            </span>
          </div>
        </div>

        <div className="flex space-x-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  i === 0
                    ? "rgba(253, 3, 3, 0.8)"
                    : i === 1
                    ? "rgba(147, 28, 99, 0.8)"
                    : "rgba(41, 34, 195, 0.8)",
                animation: `bounce 1s infinite ${i * 0.2}s`,
                transform: "translateZ(0)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              backgroundColor: i % 2 === 0 ? "rgba(253, 3, 3, 0.4)" : "rgba(41, 34, 195, 0.4)",
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              animation: `float 4s infinite ${i * 0.8}s`,
              transform: "translateZ(0)",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(0, -30px, 0) rotate(180deg) scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg) translateZ(0);
          }
          to {
            transform: rotate(360deg) translateZ(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1) translateZ(0);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05) translateZ(0);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0) translateZ(0);
          }
          40% {
            transform: translateY(-8px) translateZ(0);
          }
          60% {
            transform: translateY(-4px) translateZ(0);
          }
        }
      `}</style>
    </div>
  );
};

// Separate component for useSearchParams logic
const PreloaderController = ({ onPreloaderVisibilityChange }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldShowPreloader = () => {
      const isDirectVisit =
        !document.referrer ||
        (document.referrer && new URL(document.referrer).origin !== window.location.origin);
      const hasSeenPreloader = sessionStorage.getItem("curelogics-preloader-seen");
      return isDirectVisit && !hasSeenPreloader;
    };

    if (shouldShowPreloader()) {
      onPreloaderVisibilityChange(true);
      sessionStorage.setItem("curelogics-preloader-seen", "true");
    } else {
      onPreloaderVisibilityChange(false);
    }
  }, [pathname, searchParams, onPreloaderVisibilityChange]);

  return null;
};

const LandingPage = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setTimeout(() => {
      setIsContentReady(true);
    }, 100);
  }, []);

  const handlePreloaderVisibilityChange = useCallback((shouldShow) => {
    if (!shouldShow) {
      setShowPreloader(false);
      setIsContentReady(true);
    } else {
      setShowPreloader(true);
      setTimeout(() => {
        setIsContentReady(true);
      }, 10);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading preloader...</div>}>
        <PreloaderController onPreloaderVisibilityChange={handlePreloaderVisibilityChange} />
      </Suspense>

      <div
        className="overflow-hidden"
        style={{
          opacity: showPreloader ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
          visibility: isContentReady ? "visible" : "hidden",
        }}
      >
        <header>
          <Navbar />
        </header>

        <main>
          <section id="home" aria-label="Hero Section">
            <HeroSection />
          </section>

          <section id="about" aria-label="About Us">
            <AboutSection />
          </section>

          <section id="services" aria-label="Our Services">
            <ServiceSection />
          </section>

          <section aria-label="Banner">
            <Banner />
          </section>

          <section id="projects" aria-label="Our Projects">
            <FeatureSection />
            <ProjectsSection />
          </section>

          <section id="team" aria-label="Team Members">
            <TeamMembers />
          </section>

          <section aria-label="Technologies">
            <ToolTechnologies />
          </section>

          <section aria-label="Partner Logos">
            <LogoBar />
          </section>

          <section aria-label="Why Choose CureLogics">
            <WhyCureLogics />
          </section>

          <section id="testimonials" aria-label="Client Testimonials">
            <TestimonialsSection />
          </section>

          <section id="blogs" aria-label="Latest Blogs">
            <BlogSection />
          </section>

          <section id="faqs" aria-label="Frequently Asked Questions">
            <FAQs />
          </section>

          <section id="contact" aria-label="Contact Us">
            <ContactForm />
          </section>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>

      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} isVisible={showPreloader} />
      )}
    </>
  );
};

export default LandingPage;