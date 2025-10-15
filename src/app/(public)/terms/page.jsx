"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, ShieldCheck, Clock, CheckCircle2, Download, Printer, Link as LinkIcon,
} from "lucide-react";

export default function TermsAndConditions() {
  // scroll progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth anchor scrolling
  const handleAnchor = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "use", title: "2. Use of Services" },
    { id: "ip", title: "3. Intellectual Property" },
    { id: "liability", title: "4. Limitation of Liability" },
    { id: "changes", title: "5. Changes to Terms" },
    { id: "contact", title: "6. Contact Us" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-white to-white text-[var(--color-text)]">
      {/* Scroll progress */}
      <div className="sticky top-0 z-40 h-1 bg-transparent">
        <div
          className="h-1 bg-[var(--color-primary)] transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Page hero */}
      <section className="px-6 lg:px-10 pt-10 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                Legal & Compliance
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Terms & Conditions
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
                Please read these Terms and Conditions carefully before using our platform.
                By accessing or using our services, you agree to be bound by these terms.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600">Last updated:</span>
                <span className="font-medium">Sep 20, 2025</span>
              </div>

              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content + TOC */}
      <section className="px-6 lg:px-10 pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sticky ToC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-16">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <FileText className="h-4 w-4" />
                  On this page
                </div>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => handleAnchor(e, s.id)}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-xs text-neutral-500">Version</div>
                <div className="mt-1 font-medium">v1.4.0</div>
                <p className="mt-2 text-xs text-neutral-500">
                  These terms apply to all users of the platform. Enterprise contracts may include additional terms.
                </p>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <motion.main
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-9"
          >
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[var(--shadow-soft)]">
              {/* Callout */}
              <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <p>
                    By continuing to use the platform, you acknowledge that you have read and agree to these Terms & Conditions.
                  </p>
                </div>
              </div>

              {/* Sections */}
              <ArticleSection id="acceptance" title="1. Acceptance of Terms">
                By accessing and using this platform, you accept and agree to be bound by the terms and provisions of this agreement.
                If you do not agree with any part of these terms, you may not use our services.
              </ArticleSection>

              <ArticleSection id="use" title="2. Use of Services">
                You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others
                or restrict their use and enjoyment of the services. Prohibited behavior includes harassing, causing distress,
                or transmitting obscene or offensive content.
              </ArticleSection>

              <ArticleSection id="ip" title="3. Intellectual Property">
                All content, features, and functionality on this platform, including text, graphics, logos, and software, are the
                property of our company and are protected by international copyright, trademark, and other laws.
              </ArticleSection>

              <ArticleSection id="liability" title="4. Limitation of Liability">
                We are not liable for any damages that may occur as a result of using our services. Your use of the platform is at
                your own risk and responsibility.
              </ArticleSection>

              <ArticleSection id="changes" title="5. Changes to Terms">
                We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Changes will be
                effective immediately upon posting on the website. Your continued use of the platform constitutes acceptance of the modified terms.
              </ArticleSection>

              <ArticleSection id="contact" title="6. Contact Us">
                If you have any questions about these Terms & Conditions, please contact us at
                <span className="font-medium text-[var(--color-secondary)]"> support@example.com</span>.
              </ArticleSection>
            </div>
          </motion.main>
        </div>
      </section>
    </div>
  );
}

/* ---------- Subcomponent: section with anchor + copy link ---------- */
function ArticleSection({ id, title, children }) {
  const hRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${location.origin}${location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { }
  };

  return (
    <section id={id} className="scroll-mt-20 border-b last:border-b-0 border-neutral-100 py-6">
      <div className="group flex items-start justify-between gap-4">
        <h2 ref={hRef} className="text-lg md:text-xl font-semibold">
          {title}
        </h2>
        <button
          aria-label="Copy section link"
          className="opacity-0 group-hover:opacity-100 transition text-neutral-500 hover:text-neutral-700"
          onClick={copyLink}
          type="button"
          title="Copy link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 leading-relaxed text-neutral-700">{children}</p>
      {copied && (
        <span className="mt-3 inline-block text-xs text-emerald-600">Link copied</span>
      )}
    </section>
  );
}
