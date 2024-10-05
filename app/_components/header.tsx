"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TransitionalLink from "../utils/transition-link";
import { motion } from "framer-motion";

const Header = () => {
  const [visible, setVisible] = useState(true); // Controls header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Tracks last scroll position

  // Track scroll direction and update header visibility
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // User is scrolling down and scrolled past 100px
      setVisible(false);
    } else {
      // User is scrolling up or hasn't scrolled far enough
      setVisible(true);
    }

    // Set the last scroll position to the current scroll position
    setLastScrollY(currentScrollY);
  };

  // Add scroll listener and clean up on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -100,
      }} // Animate visibility based on scrolling
      className="container fixed inset-x-0 top-0 z-[5000] mx-auto w-screen px-4 transition-opacity duration-300 md:px-0"
    >
      <div>
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <TransitionalLink href="/" className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 font-bold text-black">
              SS
            </div>
            <span className="text-xl font-semibold text-white">
              SaintStream
            </span>
          </TransitionalLink>

          {/* Navigation Links */}
          <nav className="hidden space-x-6 font-sans text-lg md:flex">
            <TransitionalLink
              href="/"
              className="font-semibold text-white hover:text-green-500"
            >
              Home
            </TransitionalLink>
            <TransitionalLink
              href="/"
              className="text-gray-200 hover:text-green-500"
            >
              Discover
            </TransitionalLink>
            <TransitionalLink
              href="/"
              className="text-gray-200 hover:text-green-500"
            >
              Movie Release
            </TransitionalLink>
            <TransitionalLink
              href="#"
              className="text-gray-200 hover:text-green-500"
            >
              Forum
            </TransitionalLink>
            <TransitionalLink
              href="#"
              className="text-gray-200 hover:text-green-500"
            >
              About
            </TransitionalLink>
          </nav>

          {/* Search and Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Search className="hidden cursor-pointer text-gray-400 hover:text-green-500 md:block" />
            <button className="rounded-md border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-800">
              Sign up
            </button>
            <button className="rounded-md bg-green-500 px-4 py-2 text-black hover:bg-green-600">
              Login
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
