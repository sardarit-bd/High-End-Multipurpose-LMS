import CourseCard from "../courses/CourseCard";

export default function FeaturedCourses() {
const courses = [
  {
    title: "Information About UI/UX Design Degree",
    category: "UI/UX",
    lessons: 20,
    duration: "1 hr 45 min",
    price: "$500",
    oldPrice: "$750",
    isFree: false,
    author: "Binodh Sation",
    authorImg: "/courses/uiux.jpg",
    rating: 5,
    image: "/courses/uiux.jpg",
  },
  {
    title: "Learn & Create ReactJS Tech Fundamentals Apps",
    category: "Productivity",
    lessons: 28,
    duration: "2 hr 10 min",
    price: "$300",
    oldPrice: "$500",
    isFree: true,
    author: "David Bentel",
    authorImg: "/courses/uiux.jpg",
    rating: 5,
    image: "/courses/react.jpg",
  },
  {
    title: "The Complete Business and Management Course",
    category: "Management",
    lessons: 25,
    duration: "2 hr 00 min",
    price: "$350",
    oldPrice: "$600",
    isFree: false,
    author: "Calvin Johnson",
    authorImg: "/courses/uiux.jpg",
    rating: 5,
    image: "/courses/business.jpg",
  },
  {
    title: "Build Creative Arts & Media Course Completed",
    category: "Art & Media",
    lessons: 22,
    duration: "1 hr 30 min",
    price: "$500",
    oldPrice: "$800",
    isFree: false,
    author: "David Bentel",
    authorImg: "/courses/uiux.jpg",
    rating: 5,
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {courses.map((c, i) => (
           <CourseCard course={c} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
