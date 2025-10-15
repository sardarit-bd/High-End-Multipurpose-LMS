"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, Cookie, Clock, FileText, Printer, Download, Link as LinkIcon, Mail
} from "lucide-react";

export default function PrivacyPolicy() {
  // scroll progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = [
    { id: "collect", title: "1. Information We Collect" },
    { id: "use", title: "2. How We Use Your Information" },
    { id: "cookies", title: "3. Cookies & Tracking" },
    { id: "security", title: "4. Data Security" },
    { id: "sharing", title: "5. Sharing of Information" },
    { id: "rights", title: "6. Your Rights" },
    { id: "changes", title: "7. Changes to This Policy" },
    { id: "contact", title: "8. Contact Us" },
  ];

  const goTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-white to-white text-[var(--color-text)]">
      {/* Scroll progress */}
      <div className="sticky top-0 z-40 h-1 bg-transparent">
        <div
          className="h-1 bg-[var(--color-primary)] transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Hero */}
      <section className="px-6 lg:px-10 pt-10 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 shadow-sm">
                <Shield className="h-3.5 w-3.5" />
                Privacy & Data Protection
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
                Your privacy matters. This policy explains what we collect, how we use it, and the choices you have.
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
      <section className="px-6 lg:px-10 pb-14 pt-3">
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
                      onClick={(e) => goTo(e, s.id)}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-xs text-neutral-500">Data Controller</div>
                <div className="mt-1 font-medium">Your Company Ltd.</div>
                <p className="mt-2 text-xs text-neutral-500">
                  We process data as described below and according to applicable laws.
                </p>
              </div>
            </div>
          </aside>

          {/* Main */}
          <motion.main
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-9"
          >
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[var(--shadow-soft)]">
              {/* Callout */}
              <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                We do not sell your personal data. You can manage cookies and marketing preferences anytime.
              </div>

              <Section id="collect" title="1. Information We Collect">
                We may collect personal details (e.g., name, email, phone, billing info) when you register or transact.
                We also collect technical data (IP, device info, browser, usage) to improve performance and security.
              </Section>

              <Section id="use" title="2. How We Use Your Information">
                We use data to operate and improve the platform, provide support, personalize content, process payments,
                detect/prevent fraud, and comply with legal obligations. We only process data when we have a lawful basis.
              </Section>

              <Section id="cookies" title="3. Cookies & Tracking">
                We use cookies, local storage, and similar technologies for essential functionality, analytics, and personalization.
                You may disable non-essential cookies via your browser or our preferences tool below; some features may be limited.
                <div className="mt-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
                    onClick={() => alert("Open cookie preferences modal")}
                  >
                    <Cookie className="h-4 w-4" />
                    Open Cookie Preferences
                  </button>
                </div>
              </Section>

              <Section id="security" title="4. Data Security">
                We apply industry-standard safeguards (encryption in transit, access controls, monitoring).
                No method of transmission is 100% secure; we continually improve our protections.
              </Section>

              <Section id="sharing" title="5. Sharing of Information">
                We may share data with vetted service providers (hosting, payments, analytics, support) under strict contractual
                obligations. We may also share when required by law or to protect rights, safety, and integrity of our services.
              </Section>

              <Section id="rights" title="6. Your Rights">
                Depending on your location, you may have rights to access, correct, delete, or export your data, object to or
                restrict certain processing, and withdraw consent. To make a request, contact us below.
                <div className="mt-3">
                  <Link
                    href="/data-request"
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
                  >
                    <FileText className="h-4 w-4" />
                    Submit a Data Request
                  </Link>
                </div>
              </Section>

              <Section id="changes" title="7. Changes to This Policy">
                We may update this policy periodically. Material changes will be communicated via email or prominent notice.
                The “Last updated” date at the top reflects the latest version.
              </Section>

              <Section id="contact" title="8. Contact Us">
                Questions or concerns? Reach out anytime:
                <div className="mt-2 text-sm">
                  <a
                    href="mailto:privacy@example.com"
                    className="inline-flex items-center gap-2 text-[var(--color-secondary)] underline-offset-4 hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    privacy@example.com
                  </a>
                </div>
              </Section>
            </div>
          </motion.main>
        </div>
      </section>
    </div>
  );
}

/* ---------- Section subcomponent with copy-link ---------- */
function Section({ id, title, children }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}#${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { }
  };

  return (
    <section id={id} className="scroll-mt-20 border-b last:border-b-0 border-neutral-100 py-6">
      <div className="group flex items-start justify-between gap-4">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <button
          type="button"
          title="Copy link"
          onClick={copy}
          className="opacity-0 group-hover:opacity-100 transition text-neutral-500 hover:text-neutral-700"
          aria-label="Copy section link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 leading-relaxed text-neutral-700">{children}</p>
      {copied && <span className="mt-3 inline-block text-xs text-emerald-600">Link copied</span>}
    </section>
  );
}
