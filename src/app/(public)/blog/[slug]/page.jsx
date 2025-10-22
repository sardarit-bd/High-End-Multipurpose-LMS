"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar, User, Share2, Facebook, Twitter, Linkedin, Send, ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";

/** mock data */
const tags = ["HTML", "CSS", "JavaScript", "React", "Next.js", "UX"];
const recentPosts = [
  { id: 1, title: "Design Systems that Scale", href: "/blog/design-systems-that-scale", date: "12 Aug 2025", thumb: "/images/blog-1.jpg" },
  { id: 2, title: "State Management in 2024", href: "/blog/state-management-2024", date: "28 Jul 2025", thumb: "/images/blog-3.jpg" },
  { id: 3, title: "Optimizing Web Vitals", href: "/blog/optimizing-web-vitals", date: "05 Jul 2025", thumb: "/images/blog-2.jpg" },
];

export default function BlogSingle() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(Math.min(1, Math.max(0, h.scrollTop / (h.scrollHeight - h.clientHeight))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      alert(t("blog.linkCopied"));
    } catch {}
  };

  return (
    <main className="relative">
      {/* Progress bar */}
      <div className="sticky top-0 z-40 h-1 bg-transparent">
        <div
          className="h-1 bg-[var(--color-primary)] transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
          {t("blog.title")}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[var(--color-text)] shadow-sm">
            <User className="h-4 w-4 text-[var(--color-text)]/70" />
            {t("blog.author")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[var(--color-text)] shadow-sm">
            <Calendar className="h-4 w-4 text-[var(--color-text)]/70" />
            {t("blog.date")}
          </span>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-[var(--shadow-soft)] overflow-hidden">
              <img
                src="/images/blog-2.jpg"
                alt={t("blog.imageAlt")}
                className="w-full max-h-[420px] object-cover"
              />

              <div className="p-6 md:p-8 prose max-w-none">
                <p>{t("blog.para1")}</p>
                <p>{t("blog.para2")}</p>
                <blockquote>{t("blog.quote")}</blockquote>
                <p>{t("blog.para3")}</p>

                <h3>{t("blog.focus")}</h3>
                <ul>
                  <li>{t("blog.focus1")}</li>
                  <li>{t("blog.focus2")}</li>
                  <li>{t("blog.focus3")}</li>
                  <li>{t("blog.focus4")}</li>
                  <li>{t("blog.focus5")}</li>
                </ul>
              </div>
            </div>

            {/* Comments */}
            <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <h4 className="text-lg font-semibold mb-4">{t("blog.commentTitle")}</h4>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder={t("blog.name")} />
                  <Input type="email" placeholder={t("blog.email")} />
                </div>
                <Textarea rows={5} placeholder={t("blog.comment")} />
                <label className="flex items-start gap-2 text-sm text-[var(--color-text)]/70">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-neutral-300 text-[var(--color-primary)]" />
                  {t("blog.save")}
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-white shadow hover:opacity-95"
                  style={{ background: "var(--color-primary)" }}
                >
                  <Send className="h-4 w-4" />
                  {t("blog.submit")}
                </button>
              </form>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-6">
              <Card title={t("blog.share")}>
                <div className="flex items-center gap-2">
                  <button onClick={copyLink} className="rounded-lg border px-3 py-2 hover:bg-neutral-50">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </Card>

              <Card title={t("blog.tags")}>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tname) => (
                    <Link key={tname} href={`/tag/${tname.toLowerCase()}`} className="rounded-full border px-3 py-1 text-sm">
                      #{tname}
                    </Link>
                  ))}
                </div>
              </Card>

              <Card title={t("blog.recent")}>
                <ul className="space-y-3">
                  {recentPosts.map((p) => (
                    <li key={p.id}>
                      <Link href={p.href} className="group flex items-center gap-3 rounded-xl border p-2 hover:bg-neutral-50">
                        <img src={p.thumb} alt={p.title} className="h-14 w-14 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium group-hover:underline">{p.title}</p>
                          <p className="text-xs text-neutral-500">{p.date}</p>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 text-neutral-400 group-hover:text-neutral-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* Helper Components */
function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow">
      <h5 className="mb-3 text-sm font-semibold">{title}</h5>
      {children}
    </div>
  );
}
function Input(props) {
  return <input {...props} className="w-full rounded-lg border px-4 py-2" />;
}
function Textarea(props) {
  return <textarea {...props} className="w-full rounded-lg border px-4 py-2" />;
}
