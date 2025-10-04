"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-[var(--color-background)] shadow-[var(--shadow-soft)] sticky top-0 z-10 border-b border-[var(--color-primary)]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-[var(--color-text)]">ASIA-LMS</span>
            </div>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-8">
            <a
              href="#"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
            >
              Home
            </a>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
                onClick={() => toggleDropdown("courses")}
              >
                Courses
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openDropdown === "courses" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--color-background)] rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] border border-[var(--color-primary)] z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                    >
                      Web Development
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                    >
                      Mobile Development
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                    >
                      Data Science
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
            >
              Dashboard
            </a>

            {/* Pages Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
                onClick={() => toggleDropdown("pages")}
              >
                Pages
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openDropdown === "pages" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--color-background)] rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] border border-[var(--color-primary)] z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                    >
                      About Us
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                    >
                      Contact
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                    >
                      FAQ
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
            >
              Blog
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-x-4">
            {/* Icons */}
            <div className="hidden md:flex items-center space-x-3 text-[var(--color-secondary)]">
              {/* Search */}
              <button className="p-2 hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {/* Cart */}
              <button className="p-2 hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>
              {/* Notifications */}
              <button className="p-2 hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              {/* Settings */}
              <button className="p-2 hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium text-sm">
                <Link href='/login'>Login</Link>
              </button>
              <span className="text-[var(--color-accent)]">|</span>
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-md text-sm font-medium">
                <Link href="/register">Register</Link>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 right-4 w-64 bg-[var(--color-background)] rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] border border-[var(--color-primary)] z-50 py-2">
            <div className="flex flex-col space-y-1">
              <a
                href="#"
                className="px-4 py-2 text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] font-medium"
              >
                Home
              </a>

              <div className="px-4 py-2">
                <button
                  className="flex items-center justify-between w-full text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
                  onClick={() => toggleDropdown("mobile-courses")}
                >
                  Courses
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === "mobile-courses" && (
                  <div className="ml-4 mt-1 space-y-1">
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-[var(--color-text)] hover:text-white hover:bg-[var(--color-primary)] rounded-md"
                    >
                      Web Development
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-[var(--color-text)] hover:text-white hover:bg-[var(--color-primary)] rounded-md"
                    >
                      Mobile Development
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-[var(--color-text)] hover:text-white hover:bg-[var(--color-primary)] rounded-md"
                    >
                      Data Science
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="px-4 py-2 text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] font-medium"
              >
                Dashboard
              </a>

              <div className="px-4 py-2">
                <button
                  className="flex items-center justify-between w-full text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
                  onClick={() => toggleDropdown("mobile-pages")}
                >
                  Pages
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === "mobile-pages" && (
                  <div className="ml-4 mt-1 space-y-1">
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-[var(--color-text)] hover:text-white hover:bg-[var(--color-primary)] rounded-md"
                    >
                      About Us
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-[var(--color-text)] hover:text-white hover:bg-[var(--color-primary)] rounded-md"
                    >
                      Contact
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-[var(--color-text)] hover:text-white hover:bg-[var(--color-primary)] rounded-md"
                    >
                      FAQ
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="px-4 py-2 text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] font-medium"
              >
                Blog
              </a>

              {/* Mobile Auth Buttons */}
              <div className="border-t border-[var(--color-primary)] mt-2 pt-3">
                <div className="flex flex-col space-y-2 px-4">
                  <button className="w-full text-center py-2 text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium border border-[var(--color-primary)] rounded-md hover:bg-[var(--color-background)]">
                    Sign in
                  </button>
                  <button className="w-full text-center py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-md">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
