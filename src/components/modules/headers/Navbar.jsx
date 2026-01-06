"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGlobe, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";


const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  // Refs for dropdowns
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const pagesDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop pages dropdown
      if (
        pagesDropdownRef.current &&
        !pagesDropdownRef.current.contains(event.target)
      ) {
        if (openDropdown === "pages") {
          setOpenDropdown(null);
        }
      }

      // Close language dropdown
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        if (openDropdown === "language") {
          setOpenDropdown(null);
        }
      }

      // Close mobile menu when clicking outside
      if (isMenuOpen && !event.target.closest("nav")) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen, openDropdown]);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ms", label: "Malay", flag: "🇲🇾" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenDropdown(null);
    closeMenu();
  };

  const menuLinks = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("leaderboard"), href: "/leaderboard" },
    { name: t("instructors"), href: "/instructors" },
    { name: t("games"), href: "/games" },
    {
      name: t("pages"),
      key: "pages",
      dropdown: [
        { name: t("pricing"), href: "/pricing" },
        { name: t("dashboard"), href: "/dashboard" },
        { name: t("checkout"), href: "/checkout" },
        { name: t("event"), href: "/event" },
        { name: t("shop"), href: "/shop" },
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: "/contact" },
        { name: t("blog"), href: "/blog" },
        { name: t("sponsorship"), href: "/sponsorship" },
        { name: t("terms"), href: "/terms" },
        { name: t("privacy"), href: "/privacy" },
        { name: t("faq"), href: "/faq" },
        { name: "404", href: "/404" },
        { name: t("success"), href: "/success-history" },
      ],
    },
    { name: t("donation"), href: "/donation" },
  ];

  const isActive = (href) => pathname === href;

 if (loading) {
    return <div>Loading...</div>
  }
  return (
    <nav className="bg-[var(--color-background)] border-b border-[var(--color-primary)] shadow sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-extrabold text-[var(--color-secondary)]"
        >
          <Image src="/logo.png" alt="Logo Image" width={120} height={90} />
        </Link>

        {/* Desktop Menu - Unchanged */}
        <div className="hidden lg:flex items-center gap-8">
          {menuLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative" ref={pagesDropdownRef}>
                <button
                  onClick={() => toggleDropdown(link.key)}
                  className={`flex items-center gap-1 font-medium transition-all duration-200 ${openDropdown === link.key
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                    }`}
                >
                  {link.name}
                  <RiArrowDropDownLine
                    className={`text-2xl transition-transform duration-200 ${openDropdown === link.key ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`absolute left-0 mt-3 w-52 bg-[var(--color-background)] border border-[var(--color-primary)] rounded-md shadow-lg z-50 transition-all duration-200 transform origin-top ${openDropdown === link.key
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${isActive(item.href)
                          ? "bg-[var(--color-primary)] text-white"
                          : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`font-medium transition-colors duration-200 ${isActive(link.href)
                    ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                  }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop Language Selector & Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => toggleDropdown("language")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <FaGlobe className="text-[var(--color-primary)] group-hover:text-white transition-colors duration-200" />
                <span className="text-sm font-medium flex items-center gap-1">
                  <span className="text-base">{currentLanguage?.flag}</span>
                  <span className="hidden xl:block">
                    {currentLanguage?.label}
                  </span>
                </span>
              </div>
              <FaChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${openDropdown === "language" ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-2 bg-white border border-[var(--color-primary)] rounded-lg shadow-lg z-50 min-w-[140px] overflow-hidden transition-all duration-200 transform origin-top ${openDropdown === "language"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  onClick={() => changeLanguage(lng.code)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 ${i18n.language === lng.code
                      ? "bg-[var(--color-primary)] text-white"
                      : "hover:bg-[var(--color-background)] text-[var(--color-text)]"
                    }`}
                >
                  <span className="text-base">{lng.flag}</span>
                  <span className="font-medium">{lng.label}</span>
                </button>
              ))}
            </div>
          </div>
          {!user ? (<>
            <Link
            href="/login"
            onClick={closeMenu}
            className="flex items-center justify-center px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all duration-200"
            title={t("login")}
          >
            <span className="hidden xl:inline">{t("login")}</span>
            <span className="xl:hidden">
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/register"
            onClick={closeMenu}
            className="flex items-center justify-center px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-medium shadow-sm transition-all duration-200"
            title={t("register")}
          >
            <span className="hidden xl:inline">{t("register")}</span>
            <span className="xl:hidden">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </span>
          </Link>
          </>):(<>
            <button
            onClick={logout}
            className="flex items-center justify-center px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all duration-200"
          >
            Logout
          </button>

          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center justify-center px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-medium shadow-sm transition-all duration-200"
            title={t("dashboard")}
          >
            <span className="hidden xl:inline">{t("dashboard")}</span>
            <span className="xl:hidden">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </span>
          </Link>
          </>)}
        </div>

        {/* Enhanced Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[var(--color-secondary)] p-3 transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white rounded-lg active:scale-95"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FaTimes className="text-xl transform transition-transform duration-300" />
          ) : (
            <FaBars className="text-xl transform transition-transform duration-300" />
          )}
        </button>

        {/* Enhanced Mobile & Tablet Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible delay-300"
            }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-500 ${isMenuOpen ? "opacity-50" : "opacity-0"
              }`}
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-0 right-0 h-[1500px] w-[550px] max-w-[85vw] bg-[var(--color-background)] border-l border-[var(--color-primary)] shadow-2xl transform transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-primary)] bg-[var(--color-background)]">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-2xl font-extrabold text-[var(--color-secondary)]"
              >
                <Image
                  src="/logo.png"
                  alt="Logo Image"
                  width={90}
                  height={70}
                  className="md:w-36"
                />
              </Link>
              <button
                onClick={closeMenu}
                className="p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200"
                aria-label="Close menu"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="h-[700px] bg-[#EDFDF5] overflow-y-auto pb-24">
              <div className="p-4">
                {/* Main Navigation Links */}
                <div className="space-y-1 mb-6">
                  {menuLinks.map((link) =>
                    link.dropdown ? (
                      <div key={link.name} className="relative">
                        <button
                          onClick={() => toggleDropdown(`${link.key}-mobile`)}
                          className={`flex items-center justify-between w-full text-left font-medium py-3 px-4 rounded-lg transition-all duration-200 ${openDropdown === `${link.key}-mobile`
                              ? "bg-[var(--color-primary)] text-white"
                              : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                            }`}
                        >
                          <span>{link.name}</span>
                          <RiArrowDropDownLine
                            className={`text-xl transition-transform duration-200 ${openDropdown === `${link.key}-mobile`
                                ? "rotate-180"
                                : ""
                              }`}
                          />
                        </button>

                        <div
                          className={`ml-4 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${openDropdown === `${link.key}-mobile`
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMenu}
                                className={`block py-2 px-4 text-sm rounded-lg transition-colors duration-200 ${isActive(item.href)
                                    ? "bg-[var(--color-primary)] text-white font-medium"
                                    : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                                  }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div
                          className={`ml-4 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${openDropdown === `${link.key}-mobile`
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                            }`}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={closeMenu}
                              className={`block py-2 px-4 text-sm rounded-lg transition-colors duration-200 ${isActive(item.href)
                                  ? "bg-[var(--color-primary)] text-white font-medium"
                                  : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                                }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={closeMenu}
                        className={`block font-medium py-3 px-4 rounded-lg transition-all duration-200 ${isActive(link.href)
                            ? "bg-[var(--color-primary)] text-white shadow-md"
                            : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
                          }`}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>

                {/* Language Selector */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
                    <FaGlobe className="text-[var(--color-primary)]" />
                    {t("language") || "Select Language"}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => changeLanguage(lng.code)}
                        className={`flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-lg border-2 transition-all duration-200 active:scale-95 ${i18n.language === lng.code
                            ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-[var(--color-background)] hover:border-[var(--color-primary)]"
                          }`}
                      >
                        <span className="text-base">{lng.flag}</span>
                        <span className="font-medium">{lng.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="flex flex-col gap-3">
                  {!user ? (<><Link
                    href="/login"
                    onClick={closeMenu}
                    className="text-center px-4 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all duration-200 active:scale-95"
                  >
                    {t("login")}
                  </Link>
                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md transition-all duration-200 active:scale-95"
                    >
                      {t("register")}
                    </Link></>) : (<>
                      <Link
                        href="/logout"
                        onClick={closeMenu}
                        className="text-center px-4 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all duration-200 active:scale-95"
                      >
                        {t("logout")}
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={closeMenu}
                        className="text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md transition-all duration-200 active:scale-95"
                      >
                        {t("dashboard")}
                      </Link>
                    </>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
