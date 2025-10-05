"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/dashboard" },
    {
      name: "Pages",
      dropdown: [
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
    { name: "Blog", href: "#" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[var(--color-background)] border-b border-[var(--color-primary)] shadow-[var(--shadow-soft)] sticky top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[var(--color-text)]">
            ASIA-LMS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative">
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="flex items-center gap-1 text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
                  >
                    {link.name}
                    <svg
                      className="w-4 h-4"
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

                  {openDropdown === link.name && (
                    <div className="absolute left-0 top-8 mt-3 w-48 bg-[var(--color-background)] shadow-[var(--shadow-medium)] border border-[var(--color-primary)] z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium text-sm"
            >
              Login
            </Link>
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-md text-sm font-medium">
              <Link href="/register">Register</Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)]"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Background Blur when sidebar open */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[var(--color-background)] shadow-[var(--shadow-medium)] border-r border-[var(--color-primary)] z-50 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 h-16 border-b border-[var(--color-primary)]">
          <span className="text-xl font-bold text-[var(--color-text)]">
            ASIA-LMS
          </span>
          <button
            onClick={toggleMenu}
            className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)]"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-2">
          {menuLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  onClick={() => toggleDropdown(link.name)}
                  className="flex justify-between w-full text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium py-2"
                >
                  {link.name}
                  <svg
                    className="w-4 h-4"
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
                {openDropdown === link.name && (
                  <div className="ml-4 space-y-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white rounded-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium py-2"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Auth Buttons */}
          <div className="mt-4 border-t border-[var(--color-primary)] pt-4">
            <Link
              href="/login"
              className="block text-center py-2 border border-[var(--color-primary)] rounded-md text-[var(--color-secondary)] hover:bg-[var(--color-background)] hover:text-[var(--color-secondary-hover)] font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block text-center py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-md mt-2"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
