export default function FeaturedCourses() {
  const courses = [
    {
      title: "Information About UI/UX Design Degree",
      category: "UI/UX",
      price: "$500",
      author: "Binodh Sation",
      rating: "5.0",
      image: "/courses/uiux.jpg",
    },
    {
      title: "Learn & Create ReactJS Tech Fundamentals Apps",
      category: "Productivity",
      price: "$300",
      author: "David Bentel",
      rating: "5.0",
      image: "/courses/react.jpg",
    },
    {
      title: "The Complete Business and Management Course",
      category: "Management",
      price: "$350",
      author: "Calvin Johnson",
      rating: "5.0",
      image: "/courses/business.jpg",
    },
    {
      title: "Build Creative Arts & Media Course Completed",
      category: "Art & Media",
      price: "$500",
      author: "David Bentel",
      rating: "5.0",
      image: "/courses/art.jpg",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="container px-4 mx-auto text-center">
        <p className="text-[var(--color-secondary)] font-medium text-sm mb-2">
          Featured Courses
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          What’s New in AsiaLMS
        </h2>
        <p className="text-gray-600 mb-10">
          Discover our featured courses, specially curated to help you gain in-demand skills.
        </p>

        {/* Course Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-[var(--radius-card)] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-40 w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-xs px-3 py-1 rounded-full">
                  {c.category}
                </span>
                <span className="absolute top-3 right-3 bg-[var(--color-accent)] text-[var(--color-text)] text-xs px-3 py-1 rounded-full">
                  {c.price}
                </span>
              </div>

              <div className="p-5 text-left">
                <h3 className="font-semibold text-[var(--color-text)] mb-2 line-clamp-2">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">👨‍🏫 {c.author}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>⭐ {c.rating}</span>
                  <button className="px-3 py-1 text-white bg-[var(--color-secondary)] rounded-full hover:bg-[var(--color-secondary-hover)] transition">
                    Buy Course Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
