"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar, User, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon,
  Send, Star, ArrowRight
} from "lucide-react";

/** mock data */
const tags = ["HTML", "CSS", "JavaScript", "React", "Next.js", "UX"];
const recentPosts = [
  { id: 1, title: "Design Systems that Scale", href: "/blog/design-systems-that-scale", date: "12 Aug 2025", thumb: "/images/blog-1.jpg" },
  { id: 2, title: "State Management in 2024", href: "/blog/state-management-2024", date: "28 Jul 2025", thumb: "/images/blog-3.jpg" },
  { id: 3, title: "Optimizing Web Vitals", href: "/blog/optimizing-web-vitals", date: "05 Jul 2025", thumb: "/images/blog-2.jpg" },
];

export default function BlogSingle() {
  // top scroll progress (optional polish)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(Math.min(1, Math.max(0, h.scrollTop / (h.scrollHeight - h.clientHeight))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      alert("Link copied!");
    } catch { }
  };

  return (
    <main className="relative">
      {/* progress bar */}
      <div className="sticky top-0 z-40 h-1 bg-transparent">
        <div
          className="h-1 bg-[var(--color-primary)] transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Page Header: only title + author + date */}
      <header className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
          Learn Web App Development from Experts in 2024
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[var(--color-text)] shadow-sm">
            <User className="h-4 w-4 text-[var(--color-text)]/70" />
            John Miller
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[var(--color-text)] shadow-sm">
            <Calendar className="h-4 w-4 text-[var(--color-text)]/70" />
            20 Apr 2024
          </span>
        </div>
      </header>

      {/* Two-column layout */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Article (image inside) */}
          <article className="lg:col-span-8">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-[var(--shadow-soft)] overflow-hidden">
              {/* Featured image INSIDE the article */}
              <img
                src="/images/blog-2.jpg"
                alt="Learn Web App Development from Experts in 2024"
                className="w-full max-h-[420px] object-cover"
              />

              {/* Article body */}
              <div className="p-6 md:p-8">
                <div
                  className="
                    prose max-w-none prose-p:leading-relaxed
                    prose-headings:text-[var(--color-text)]
                    prose-p:text-[var(--color-text)]/90
                    prose-strong:text-[var(--color-text)]
                    prose-img:rounded-xl
                    text-[var(--color-text)]
                  "
                >
                  <p>
                    Web app development continues to be one of the most sought-after skills in the tech industry.
                    From lucrative job opportunities to cutting-edge technologies, learning web app development opens doors.
                  </p>
                  <p>
                    One of the key advantages of starting in 2024 is the availability of advanced tools, frameworks,
                    and learning resources. Frameworks like <strong>React</strong>, <strong>Angular</strong>, and{" "}
                    <strong>Vue.js</strong> have matured, making development more efficient and user-friendly.
                    Communities, conferences, and forums offer great networking opportunities.
                  </p>
                  <blockquote>
                    “Invest in fundamentals, then iterate fast with modern tooling. Your speed compounds with good habits.”
                  </blockquote>
                  <p>
                    If you’re ready to embark on this exciting journey, now is the time. With expert mentorship, practical
                    experience, and continuous learning, you can unlock a world of opportunities in 2024 and beyond.
                  </p>

                  <h3>What to focus on</h3>
                  <ul>
                    <li>Core web: HTML, CSS (utility-first), JavaScript/TypeScript</li>
                    <li>Frameworks: React, Vue, or Angular</li>
                    <li>Data: REST/GraphQL, caching, fetch patterns</li>
                    <li>Backend basics: Node, DBs, auth, deployment</li>
                    <li>Tooling: Git, testing, CI/CD, performance</li>
                  </ul>
                </div>

                {/* Author card */}
                <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[var(--shadow-soft)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src="/images/student-1.jpg"
                      alt="Author"
                      className="h-16 w-16 rounded-xl object-cover ring-1 ring-neutral-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">Robert Hollenbeck</h3>
                      <p className="text-sm text-[var(--color-text)]/70">
                        Experienced PM & consultant. Loves building teams, shipping fast, and teaching modern web.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <section className="mt-10">
                  <h4 className="text-lg font-semibold text-[var(--color-text)] mb-4">Reviews</h4>
                  <Review name="Adrian Henriques" rating={5} text="I highly recommend to anyone looking to learn..." />
                  <Review name="Adrian Henriques" rating={4} text="Great content—more practical demos would help." />
                </section>

                {/* Comment form */}
                <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[var(--shadow-soft)]">
                  <h4 className="text-lg font-semibold text-[var(--color-text)] mb-4">Leave a Comment</h4>
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 text-[var(--color-text)]">
                      <Input placeholder="Name" className="text-[var(--color-text)]" />
                      <Input type="email" placeholder="Email" className="text-[var(--color-text)]" />
                    </div>
                    <Textarea rows={5} placeholder="Comment" className="text-[var(--color-text)] placeholder-[var(--color-text)]" />
                    <label className="flex items-start gap-2 text-sm text-[var(--color-text)]/70">
                      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-neutral-300 text-[var(--color-primary)]" />
                      Save my name & email for next time
                    </label>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-white shadow-[var(--shadow-soft)] hover:opacity-95"
                      style={{ background: "var(--color-primary)" }}
                    >
                      <Send className="h-4 w-4" />
                      Submit
                    </button>
                  </form>
                </section>
              </div>
            </div>
          </article>

          {/* RIGHT: Sticky Sidebar (Share / Tags / Recent) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-6">
              {/* Share */}
              <Card title="Share">
                <div className="flex items-center gap-2 text-[var(--color-text)]">
                  <ShareIconBtn href="#" label="Facebook"><Facebook className="h-4 w-4" /></ShareIconBtn>
                  <ShareIconBtn href="#" label="Twitter"><Twitter className="h-4 w-4" /></ShareIconBtn>
                  <ShareIconBtn href="#" label="LinkedIn"><Linkedin className="h-4 w-4" /></ShareIconBtn>
                  <button
                    onClick={copyLink}
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50"
                    title="Copy link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </Card>

              {/* Tags */}
              <Card title="Tags">
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Link
                      key={t}
                      href={`/tag/${t.toLowerCase()}`}
                      className="rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-3 py-1 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)]/15"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Recent Posts */}
              <Card title="Recent Posts">
                <ul className="space-y-3">
                  {recentPosts.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={p.href}
                        className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-2 hover:bg-neutral-50"
                      >
                        <img src={p.thumb} alt={p.title} className="h-14 w-14 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[var(--color-text)] group-hover:underline">
                            {p.title}
                          </p>
                          <p className="text-xs text-[var(--color-text)]/60">{p.date}</p>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 text-[var(--color-text)]/40 group-hover:text-[var(--color-text)]" />
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

/* ---------- UI helpers ---------- */
function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[var(--shadow-soft)]">
      <h5 className="mb-3 text-sm font-semibold text-[var(--color-text)]/90">{title}</h5>
      {children}
    </div>
  );
}

function ShareIconBtn({ href, label, children }) {
  return (
    <a href={href} aria-label={label} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50">
      {children}
    </a>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
    />
  );
}

function Review({ name, text, rating = 5 }) {
  return (
    <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <span className="font-medium text-[var(--color-text)]">{name}</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`}
            >
              <path d="M10 15.27l5.18 3.05-1.64-5.81L18 8.63l-6-.26L10 2 8 8.37l-6 .26 4.46 3.88L4.82 18.3 10 15.27z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[var(--color-text)]/75">{text}</p>
    </div>
  );
}
