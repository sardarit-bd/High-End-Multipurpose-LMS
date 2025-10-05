"use client";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-xl transition-shadow">
      <div className="h-40 w-full bg-[var(--color-accent)] rounded-xl mb-4 flex items-center justify-center">
        <span className="text-white font-bold">{course.title}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <img
          src={course.mentorImage}
          alt={course.mentorName}
          className="w-10 h-10 rounded-full"
        />
        <p className="text-[var(--color-text)] font-medium">{course.mentorName}</p>
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-2">⭐ {course.rating} ({course.reviews} Reviews)</p>
      <p className="text-xl font-bold text-[var(--color-primary)] mb-4">${course.price}</p>
      <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-full w-full transition-colors">
        Add to Cart
      </button>
    </div>
  );
}
