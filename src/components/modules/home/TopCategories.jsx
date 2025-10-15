"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TopCategories() {
  const { t } = useTranslation();

  const categories = [
    { name: t("categories.frontend") || "Frontend Developer", logo: "/icons/frontend.svg" },
    { name: t("categories.jira") || "Jira Management", logo: "/icons/jira.svg" },
    { name: t("categories.figma") || "Figma Developer", logo: "/icons/figma.svg" },
    { name: t("categories.webflow") || "Webflow Developer", logo: "/icons/shopify.svg" },
    { name: t("categories.framer") || "Framer Developer", logo: "/icons/framer.svg" },
    { name: t("categories.vue") || "Vue js Developer", logo: "/icons/vue.svg" },
    { name: t("categories.shopify") || "Shopify Developer", logo: "/icons/shopify.svg" },
  ];

  const scrollerRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // keep buttons state accurate on scroll/resize
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanPrev(scrollLeft > 4);
      setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // smooth step based on visible card width
  const scrollStep = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const gap = 20; // matches Tailwind gap-5
    const step = (card?.offsetWidth || 220) + gap;
    el.scrollBy({ left: dir === "left" ? -step * 2 : step * 2, behavior: "smooth" });
  };

  // drag/swipe support
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e) => {
      isDown = true;
      startX = "touches" in e ? e.touches[0].pageX : e.pageX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = "touches" in e ? e.touches[0].pageX : e.pageX;
      const delta = x - startX;
      el.scrollLeft = startScroll - delta;
    };
    const onUp = () => {
      isDown = false;
    };

    // mouse
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    // touch
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onUp);
    el.addEventListener("touchcancel", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("touchcancel", onUp);
    };
  }, []);

  return (
    <section className="w-full bg-[var(--color-background)] py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-[var(--color-secondary)] font-medium text-sm mb-2">
          {t("categories.subtitle") || "Our Categories"}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          {t("categories.title") || "Top Courses & Categories"}
        </h2>
        <p className="text-gray-600 mb-10">
          {t("categories.description") || "The right course, guided by an expert mentor, can provide invaluable insights, practical skills."}
        </p>

        {/* Carousel */}
        <div className="relative">
          {/* gradient edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[var(--color-background)] to-transparent" />

          <div
            ref={scrollerRef}
            id="scrollContainer"
            role="region"
            aria-label={t("categories.ariaLabel") || "Top categories"}
            className="flex gap-5 overflow-x-auto md:overflow-x-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
          >
            {categories.map((item, i) => (
              <button
                key={i}
                data-card
                className="cursor-pointer snap-start bg-white rounded-[var(--radius-card)] shadow-sm hover:shadow-md p-6 flex flex-col items-center justify-center transition-all min-w-[200px] md:min-w-[220px]"
                aria-label={item.name}
              >
                <img src={item.logo} alt="" className="h-10 w-10 mb-4 object-contain" />
                <h3 className="text-[var(--color-text)] font-semibold text-sm md:text-base">
                  {item.name}
                </h3>
              </button>
            ))}
          </div>

          {/* Controls (desktop) */}
          <button
            type="button"
            aria-label={t("categories.previous") || "Previous"}
            disabled={!canPrev}
            onClick={() => scrollStep("left")}
            className={`hidden md:flex absolute left-1 top-[45%] -translate-y-1/2 p-2 rounded-full shadow-md transition
              ${canPrev ? "bg-white hover:bg-[var(--color-primary)] hover:text-white" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            aria-label={t("categories.next") || "Next"}
            disabled={!canNext}
            onClick={() => scrollStep("right")}
            className={`hidden md:flex absolute right-1 top-[45%] -translate-y-1/2 p-2 rounded-full shadow-md transition
              ${canNext ? "bg-white hover:bg-[var(--color-primary)] hover:text-white" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* View All Button */}
        <div className="mt-10">
          <button className="px-6 py-2 rounded-full bg-[var(--color-secondary)] text-white font-semibold hover:bg-[var(--color-secondary-hover)] transition">
            {t("categories.viewAll") || "View All Categories"}
          </button>
        </div>
      </div>
    </section>
  );
}