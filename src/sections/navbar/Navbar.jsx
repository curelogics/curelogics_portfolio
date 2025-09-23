"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/globalcomponents/Button";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const pathname = usePathname() || "/"; // Fallback to "/" if pathname is undefined

  // Sections to track
  const sections = [
    { id: "#home", label: "Home" },
    { id: "#about", label: "About" },
    { id: "#services", label: "Services" },
    { id: "#projects", label: "Projects" },
    { id: "#team", label: "Careers" },
    { id: "#blogs", label: "Blogs" },
    { id: "#contact", label: "Contact us" },
  ];

  useEffect(() => {
    // Set active link based on pathname
    if (pathname === "/blogs") {
      setActiveLink("/blogs");
      return; // Exit early to avoid scroll logic on /blogs
    }

    // Only apply scroll logic on home page
    if (pathname === "/") {
      const handleScroll = () => {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          let foundActiveSection = false;

          sections.forEach((section) => {
            if (section.id === "/blogs") return; // Skip /blogs for scroll logic
            const element = document.querySelector(section.id);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;
              if (
                scrollPosition >= offsetTop - 100 &&
                scrollPosition < offsetTop + offsetHeight - 100
              ) {
                setActiveLink(section.id);
                foundActiveSection = true;
              }
            }
          });

          // Fallback to #home if no section is active
          if (!foundActiveSection && scrollPosition < 100) {
            setActiveLink("#home");
          }
        });
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // Set active link to #home for non-home, non-blogs pages
      setActiveLink("#home");
    }
  }, [pathname]);

  // Handle navigation to specific section or page
  const handleLinkClick = (sectionId) => {
    if (sectionId === "/blogs") {
      window.location.href = "/blogs"; // Navigate to /blogs
    } else if (pathname !== "/") {
      window.location.href = `/${sectionId}`; // Navigate to section on home page
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActiveLink(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="shadow-md px-6 w-full fixed top-0 left-0 transition-all duration-300 bg-white h-20 z-[999]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-sm">
          <Image
            src="/images/fulllogo.png"
            width={100}
            height={100}
            alt="Logo"
          />
        </div>

        {/* Desktop Navigation with Animation */}
        <motion.div
          className="hidden lg:flex space-x-8 relative"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {sections.map((link, index) => (
            <motion.button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative cursor-pointer hover:text-red-500 text-black transition-all duration-300 ${
                activeLink === link.id ? "text-red-600" : ""
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {link.label}
              <motion.span
                layoutId="underline"
                className="absolute bottom-0 left-0 h-[2px] w-full bg-red-500"
                initial={{ width: "0%" }}
                animate={
                  activeLink === link.id ? { width: "100%" } : { width: "0%" }
                }
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Get Started Button (Desktop) */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => handleLinkClick("#contact")}
        >
          <Button text="Get Started" />
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          className="block lg:hidden text-red-500 text-2xl transition-all duration-500 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RxCross2 /> : "☰"}
        </button>
      </div>

      {/* Mobile Menu with Drop-down Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-lg flex flex-col items-center py-6"
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-red-500 text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              <RxCross2 />
            </button>

            {/* Mobile Menu Links */}
            {sections.map((link, index) => (
              <motion.button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block px-4 py-2 text-black hover:bg-red-500 hover:text-white transition-all duration-300 ${
                  activeLink === link.id
                    ? "text-red-500 border-b-2 border-red-600"
                    : ""
                }`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {link.label}
              </motion.button>
            ))}

            <div className="mt-4">
              <Button text="Get Started" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}