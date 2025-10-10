"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Pricing", href: "/pricing" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Instructors", href: "/instructors" },
    {
      name: "Pages",
      dropdown: [
        { name: "Checkout", href: "/checkout" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Terms and Condition", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "FAQ", href: "/faq" },
        { name: "404 Page", href: "/404" },
        { name: "Success History", href: "/success-history" },
      ],
    },
    { name: "Blog", href: "/blog" },
  ];

  // helper to check active state
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[var(--color-background)] border-b border-[var(--color-primary)] shadow-[var(--shadow-soft)] sticky top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl font-extrabold text-[var(--color-secondary)] tracking-wide"
          >
            ASIA-LMS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      openDropdown === link.name
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                    }`}
                  >
                    {link.name}
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        transform:
                          openDropdown === link.name
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
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
                    <div className="absolute left-0 mt-3 w-52 bg-[var(--color-background)] shadow-[var(--shadow-medium)] border border-[var(--color-primary)] z-50 animate-fadeIn rounded-md">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeMenu}
                          className={`block px-4 py-2 text-sm rounded transition-colors ${
                            isActive(item.href)
                              ? "bg-[var(--color-primary)] text-white"
                              : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                          }`}
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
                  onClick={closeMenu}
                  className={`font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                      : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                  }`}
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
              onClick={closeMenu}
              className="px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-background)] transition-colors"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Background Blur when sidebar open */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[var(--color-background)] shadow-[var(--shadow-medium)] border-l border-[var(--color-primary)] z-50 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 h-16 border-b border-[var(--color-primary)]">
          <span className="text-xl font-bold text-[var(--color-secondary)]">
            ASIA-LMS
          </span>
          <button
            onClick={toggleMenu}
            className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] transition-colors"
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
                  className="flex justify-between w-full text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] font-medium py-2 transition-colors"
                >
                  {link.name}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === link.name ? "rotate-180" : "rotate-0"
                    }`}
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
                  <div className="ml-4 space-y-1 animate-slideDown">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        className={`block px-3 py-2 text-sm rounded transition-colors ${
                          isActive(item.href)
                            ? "bg-[var(--color-primary)] text-white"
                            : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                        }`}
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
                onClick={closeMenu}
                className={`font-medium py-2 transition-colors ${
                  isActive(link.href)
                    ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)]"
                }`}
              >
                {link.name}
              </Link>
            )
          )}

          {/* Auth Buttons */}
          <div className="mt-4 border-t border-[var(--color-primary)] pt-4">
            <Link
              href="/login"
              onClick={closeMenu}
              className="block text-center py-2 border border-[var(--color-primary)] rounded-md text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="block text-center py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-md mt-2 shadow-sm transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
