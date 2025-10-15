import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TopCategories() {
  const categories = [
    { name: "Frontend Developer", logo: "/icons/frontend.svg" },
    { name: "Jira Management", logo: "/icons/jira.svg" },
    { name: "Figma Developer", logo: "/icons/figma.svg" },
    { name: "Webflow Developer", logo: "/icons/shopify.svg" },
    { name: "Framer Developer", logo: "/icons/framer.svg" },
    { name: "Vue js Developer", logo: "/icons/vue.svg" },
    { name: "Shopify Developer", logo: "/icons/shopify.svg" },
  ];

  return (
    <section className="w-full bg-[var(--color-background)] py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-[var(--color-secondary)] font-medium text-sm mb-2">
          Our Categories
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          Top Courses & Categories
        </h2>
        <p className="text-gray-600 mb-10">
          The right course, guided by an expert mentor, can provide invaluable insights, practical skills.
        </p>

        {/* Category Cards */}
        <div className="relative">
          <div
            id="scrollContainer"
            className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
          >
            {categories.map((item, i) => (
              <div
                key={i}
                className="snap-start bg-white rounded-[var(--radius-card)] shadow-sm hover:shadow-md p-6 flex flex-col items-center justify-center transition-all hover:-translate-y-1 duration-300 min-w-[200px] md:min-w-0"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-10 w-10 mb-4 object-contain"
                />
                <h3 className="text-[var(--color-text)] font-semibold text-sm md:text-base">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Scroll Buttons (only on desktop) */}
          <button
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition"
          // onClick={() => {
          // //   const container = document.getElementById("scrollContainer");
          // //   container.scrollBy({ left: -200, behavior: "smooth" });
          // }}
          >
            <ArrowLeft size={18} />
          </button>

          <button
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition"
          // onClick={() => {
          //   const container = document.getElementById("scrollContainer");
          //   container.scrollBy({ left: 200, behavior: "smooth" });
          // }}
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* View All Button */}
        <div className="mt-10">
          <button className="px-6 py-2 rounded-full bg-[var(--color-secondary)] text-white font-semibold hover:bg-[var(--color-secondary-hover)] transition">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}
