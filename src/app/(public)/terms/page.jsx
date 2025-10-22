"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Printer,
  Link as LinkIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TermsAndConditions() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll anchors
  const handleAnchor = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const sections = [
    { id: "acceptance", title: t("terms.acceptance.title") },
    { id: "use", title: t("terms.use.title") },
    { id: "ip", title: t("terms.ip.title") },
    { id: "liability", title: t("terms.liability.title") },
    { id: "changes", title: t("terms.changes.title") },
    { id: "contact", title: t("terms.contact.title") },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-white to-white text-[var(--color-text)]">
      {/* Scroll progress bar */}
      <div className="sticky top-0 z-40 h-1 bg-transparent">
        <div
          className="h-1 bg-[var(--color-primary)] transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Hero section */}
      <section className="px-6 lg:px-10 pt-10 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t("terms.legal")}
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                {t("terms.title")}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
                {t("terms.intro")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600">{t("terms.updated")}</span>
                <span className="font-medium">Sep 20, 2025</span>
              </div>

              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
              >
                <Printer className="h-4 w-4" />
                {t("terms.print")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-10 pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-16">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <FileText className="h-4 w-4" />
                  {t("terms.toc")}
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
                <div className="text-xs text-neutral-500">{t("terms.version")}</div>
                <div className="mt-1 font-medium">v1.4.0</div>
                <p className="mt-2 text-xs text-neutral-500">
                  {t("terms.versionNote")}
                </p>
              </div>
            </div>
          </aside>

          {/* Article sections */}
          <motion.main
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-9"
          >
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[var(--shadow-soft)]">
              <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <p>{t("terms.notice")}</p>
                </div>
              </div>

              <ArticleSection id="acceptance" title={t("terms.acceptance.title")}>
                {t("terms.acceptance.text")}
              </ArticleSection>

              <ArticleSection id="use" title={t("terms.use.title")}>
                {t("terms.use.text")}
              </ArticleSection>

              <ArticleSection id="ip" title={t("terms.ip.title")}>
                {t("terms.ip.text")}
              </ArticleSection>

              <ArticleSection id="liability" title={t("terms.liability.title")}>
                {t("terms.liability.text")}
              </ArticleSection>

              <ArticleSection id="changes" title={t("terms.changes.title")}>
                {t("terms.changes.text")}
              </ArticleSection>

              <ArticleSection id="contact" title={t("terms.contact.title")}>
                {t("terms.contact.text")}
              </ArticleSection>
            </div>
          </motion.main>
        </div>
      </section>
    </div>
  );
}

/* Subcomponent for article sections */
function ArticleSection({ id, title, children }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${location.origin}${location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <section id={id} className="scroll-mt-20 border-b last:border-b-0 border-neutral-100 py-6">
      <div className="group flex items-start justify-between gap-4">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <button
          aria-label="Copy section link"
          className="opacity-0 group-hover:opacity-100 transition text-neutral-500 hover:text-neutral-700"
          onClick={copyLink}
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 leading-relaxed text-neutral-700">{children}</p>
      {copied && (
        <span className="mt-3 inline-block text-xs text-emerald-600">
          {t("terms.linkCopied")}
        </span>
      )}
    </section>
  );
}
