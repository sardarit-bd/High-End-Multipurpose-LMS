export default function SuccessHistory() {
  const milestones = [
    {
      year: "2018",
      title: "Founded the Platform",
      description:
        "Our journey began with a vision to make learning more accessible, creating a user-friendly LMS platform for learners worldwide.",
    },
    {
      year: "2019",
      title: "First 10,000 Users",
      description:
        "We achieved our first major milestone by crossing 10,000 active users who trusted us for their learning and training needs.",
    },
    {
      year: "2021",
      title: "Global Expansion",
      description:
        "With rapid growth, we expanded globally, supporting multiple languages and enabling e-learning for diverse communities.",
    },
    {
      year: "2023",
      title: "AI-Powered Learning",
      description:
        "Introduced AI-driven personalization to make learning smarter, adaptive, and more engaging for every learner.",
    },
    {
      year: "2024",
      title: "1 Million Learners",
      description:
        "We proudly reached over 1 million learners worldwide, helping individuals and organizations achieve their educational goals.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-[var(--color-accent)]">
          Our Journey
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          Success History
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From humble beginnings to becoming a trusted LMS solution for
          learners worldwide, here’s a look at our journey through the years.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-[var(--color-primary)] pl-8 space-y-12">
        {milestones.map((item, index) => (
          <div key={index} className="relative">
            {/* Dot */}
            <div className="absolute -left-4 top-2 w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>

            {/* Content */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {item.year}
              </span>
              <h3 className="text-xl font-bold text-[var(--color-text)] mt-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
          Be Part of Our Next Chapter
        </h3>
        <p className="text-gray-600 mb-6">
          Join thousands of learners and organizations who are shaping the
          future of education with us.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
