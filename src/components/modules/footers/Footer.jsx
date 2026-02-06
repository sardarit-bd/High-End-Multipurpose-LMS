"use client"
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-secondary)]">
              <Image src="/logo.png" alt="ASIA-LMS" width={100} height={40}
                className="h-[45px] w-auto object-contain"
              />
            </h2>
            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
              {t("footer.companyDescription") || "Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities."}
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary)]">
              {t("footer.support.title") || "Support"}
            </h3>
            <ul className="space-y-2 text-[var(--color-text)]">
              <li><Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">{"About Us"}</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors">{"Contact Us"}</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">{"FAQ"}</Link></li>
              
            </ul>
          </div>

          {/* About */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary)]">
              {t("footer.about.title") || "About"}
            </h3>
            <ul className="space-y-2 text-[var(--color-text)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.about.categories") || "Categories"}</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.about.courses") || "Courses"}</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.about.aboutUs") || "About Us"}</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.about.fax") || "Fax"}</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.about.contacts") || "Contacts"}</a></li>
            </ul>
          </div> */}

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary)]">
              {t("footer.usefulLinks.title") || "Useful Links"}
            </h3>
            <ul className="space-y-2 text-[var(--color-text)]">
              <li><Link href="/shop" className="hover:text-[var(--color-primary)] transition-colors">Shop</Link></li>
              <li><Link href="/events" className="hover:text-[var(--color-primary)] transition-colors">Events</Link></li>
              <li><Link href="/packages" className="hover:text-[var(--color-primary)] transition-colors">Packages</Link></li>
             
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-secondary)]">
              {t("footer.newsletter.title") || "Subscribe Newsletter"}
            </h3>
            <p className="text-[var(--color-text)] text-sm">
              {t("footer.newsletter.description") || "Sign up to get updates & news."}
            </p>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder") || "Email Address"}
                className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button className="my-4 px-6 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-lg font-medium transition-colors text-white">
                {t("footer.newsletter.button") || "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--color-primary)] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[var(--color-text)]/70 text-sm">
              {t("Copyright 2023 © Sardar IT. All rights reserved.") || "Copyright 2023 © Sardar IT. All rights reserved."}
            </div>
            <div className="flex space-x-6 text-[var(--color-text)]/70 text-sm">
              <Link href="/terms" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.terms") || "Terms & Conditions"}</Link>
              <Link href="/privacy" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.privacy") || "Privacy Policy"}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;