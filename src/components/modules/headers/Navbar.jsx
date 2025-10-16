"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaGlobe, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const toggleDropdown = (dropdown) =>
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ms", label: "Malay", flag: "🇲🇾" }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenDropdown(null);
  };

  const menuLinks = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("dashboard"), href: "/dashboard" },
    { name: t("instructors"), href: "/instructors" },
    { name: t("games"), href: "/games" },
    {
      name: t("pages"),
      dropdown: [
        { name: t("checkout"), href: "/checkout" },
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: "/contact" },
        { name: t("terms"), href: "/terms" },
        { name: t("privacy"), href: "/privacy" },
        { name: t("faq"), href: "/faq" },
        { name: "404", href: "/404" },
        { name: t("success"), href: "/success-history" }
      ]
    },
    { name: t("blog"), href: "/blog" },
    { name: t("donation"), href: "/donation" }
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-[var(--color-background)] border-b border-[var(--color-primary)] shadow sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-extrabold text-[var(--color-secondary)]"
        >
          ASIA-LMS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative">
                <button
                  onClick={() => toggleDropdown(link.name)}
                  className={`flex items-center gap-1 font-medium ${
                    openDropdown === link.name
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                  }`}
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
                  <div className="absolute left-0 mt-3 w-52 bg-[var(--color-background)] border border-[var(--color-primary)] rounded-md shadow-md z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        className={`block px-4 py-2 text-sm ${
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
                className={`font-medium ${
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

        {/* Desktop Language Selector & Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Enhanced Language Selector */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('language')}
              className="flex items-center gap-2 px-2 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <FaGlobe className="text-[var(--color-primary)] group-hover:text-white transition-colors" />
                <span className="text-sm font-medium flex items-center gap-1">
                  <span className="text-base">{currentLanguage?.flag}</span>
                  <span className="hidden sm:block">{currentLanguage?.label}</span>
                </span>
              </div>
              <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                openDropdown === 'language' ? 'rotate-180' : ''
              }`} />
            </button>
            
            {openDropdown === 'language' && (
              <div className="absolute right-0 mt-2 bg-white border border-[var(--color-primary)] rounded-lg shadow-lg z-50 min-w-[140px] overflow-hidden">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 ${
                      i18n.language === lng.code 
                        ? "bg-[var(--color-primary)] text-white" 
                        : "hover:bg-[var(--color-background)] text-[var(--color-text)]"
                    }`}
                  >
                    <span className="text-base">{lng.flag}</span>
                    <span className="font-medium">{lng.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/login"
            onClick={closeMenu}
            className="px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            onClick={closeMenu}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
          >
            {t("register")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[var(--color-secondary)] p-2"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-[var(--color-background)] border-b border-[var(--color-primary)] shadow-md">
            <div className="container mx-auto px-4 py-4">
              {menuLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.name} className="mb-2">
                    <button
                      onClick={() => toggleDropdown(`${link.name}-mobile`)}
                      className="flex items-center justify-between w-full text-left font-medium text-[var(--color-text)] hover:text-[var(--color-secondary-hover)] py-2"
                    >
                      {link.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === `${link.name}-mobile` ? "rotate-180" : ""
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

                    {openDropdown === `${link.name}-mobile` && (
                      <div className="ml-4 mt-2 border-l-2 border-[var(--color-primary)] pl-4">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={closeMenu}
                            className={`block py-2 text-sm ${
                              isActive(item.href)
                                ? "text-[var(--color-primary)] font-medium"
                                : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
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
                    className={`block font-medium py-2 ${
                      isActive(link.href)
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-text)] hover:text-[var(--color-secondary-hover)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}

              {/* Enhanced Mobile Language Selector */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-[var(--color-text)] mb-3">
                  {t("language") || "Select Language"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className={`flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-lg border transition-all ${
                        i18n.language === lng.code
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

              {/* Mobile Auth Buttons */}
              <div className="mt-6 flex gap-3">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex-1 text-center px-4 py-3 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium text-sm transition-all"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="flex-1 text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-3 rounded-lg text-sm font-medium transition-all"
                >
                  {t("register")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;