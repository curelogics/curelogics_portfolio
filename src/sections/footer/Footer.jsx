"use client"; // Client-side rendering
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For App Router
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Search } from "lucide-react";
import { MdLocationPin, MdLocalPhone } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import CookieConsent from "../cookiesConsent/CookieConsent";
import Image from "next/image";

const Footer = () => {
  const router = useRouter(); // Get current route
  const [isExploreOpen, setIsExploreOpen] = useState(false); // Mobile toggle for Explore
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Mobile toggle for Services

  // Navigation links for Explore section
  const exploreLinks = [
    { name: "Home", path: "/#home" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Projects", path: "/#projects" },
    { name: "Careers", path: "/#careers" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "Blog", path: "/blog" },
  ];

  // Navigation links for Services section
  const serviceLinks = [
    { name: "Software Development", path: "/#software-development" },
    { name: "Digital Marketing", path: "/#digital-marketing" },
    { name: "Graphic Designing", path: "/#graphic-designing" },
    { name: "UX/UI Designing", path: "/#ux-ui-designing" },
    { name: "App Development", path: "/#app-development" },
    { name: "Website Development", path: "/#website-development" },
  ];

  return (
    <footer className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Left Section: Logo and Address */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="CureLogics Logo"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Stay connected with CureLogics for the latest updates and
              innovations in digital solutions.
            </p>
            <p className="text-sm text-gray-600 flex gap-2">
              <MdLocationPin size={25} />
              Canal Road, near Adda Khanpur, Rahim Yar Khan
            </p>
            <p className="text-sm text-gray-600 flex gap-2">
              <IoIosMail size={25} />
              hr@curelogics.org
            </p>
            <p className="text-sm text-gray-600 flex gap-2">
              <MdLocalPhone size={25} />
              +92 342 6222555
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com/curelogics"
                className="w-10 h-10 hover:w-[38px] hover:h-[38px] rounded-full bg-[#2C5194] hover:bg-[#2c50946c] flex items-center justify-center transition-all"
              >
                <FaFacebookF className="text-white" />
              </a>
              <a
                href="https://twitter.com/curelogics"
                className="w-10 h-10 hover:w-[38px] hover:h-[38px] rounded-full bg-[#2C5194] hover:bg-[#2c50946c] flex items-center justify-center transition-all"
              >
                <FaTwitter className="text-white" />
              </a>
              <a
                href="https://instagram.com/curelogics"
                className="w-10 h-10 hover:w-[38px] hover:h-[38px] rounded-full bg-[#2C5194] hover:bg-[#2c50946c] flex items-center justify-center transition-all"
              >
                <FaInstagram className="text-white" />
              </a>
              <a
                href="https://linkedin.com/company/curelogics"
                className="w-10 h-10 hover:w-[38px] hover:h-[38px] rounded-full bg-[#2C5194] hover:bg-[#2c50946c] flex items-center justify-center transition-all"
              >
                <FaLinkedinIn className="text-white" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3
              className="text-lg font-semibold text-gray-800 mb-4 md:cursor-default cursor-pointer"
              onClick={() => setIsExploreOpen(!isExploreOpen)}
            >
              Explore {isExploreOpen ? "▲" : "▼"}
            </h3>
            <ul
              className={`space-y-2 text-sm text-gray-600 ${
                isExploreOpen ? "block" : "hidden md:block"
              }`}
            >
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`hover:underline ${
                      router.pathname === "/" && link.path.includes("#")
                        ? typeof window !== "undefined" &&
                          window.location.hash === link.path.split("/")[1]
                          ? "font-bold text-blue-600"
                          : ""
                        : router.pathname === link.path
                        ? "font-bold text-blue-600"
                        : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3
              className="text-lg font-semibold text-gray-800 mb-4 md:cursor-default cursor-pointer"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services {isServicesOpen ? "▲" : "▼"}
            </h3>
            <ul
              className={`space-y-2 text-sm text-gray-600 ${
                isServicesOpen ? "block" : "hidden md:block"
              }`}
            >
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`hover:underline ${
                      router.pathname === "/" &&
                      typeof window !== "undefined" &&
                      window.location.hash === link.path.split("/")[1]
                        ? "font-bold text-blue-600"
                        : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get the latest digital updates from us.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative bg-gradient-to-r to-red-500 from-blue-500 rounded-full p-[1px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border-2 border-gray-200 rounded-full bg-white outline-none"
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  size={20}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} CureLogics. All Rights Reserved.
          </p>
        </div>
      </div>
      <CookieConsent />
    </footer>
  );
};

export default Footer;