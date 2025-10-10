const CourseTable = () => {
  const courses = [
    { name: "Introduction to Web Development", instructor: "John Doe", date: "01-09-2024", status: "Ongoing" },
    { name: "Advanced Python Programming", instructor: "Jane Smith", date: "15-08-2024", status: "Completed" },
    { name: "Project Management Fundamentals", instructor: "Michael Brown", date: "20-09-2024", status: "Ongoing" },
    { name: "Graphic Design Basics", instructor: "Emily Davis", date: "10-07-2024", status: "Completed" },
    { name: "Digital Marketing 101", instructor: "Sarah Lee", date: "05-10-2024", status: "Ongoing" },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">My Enrolled Courses</h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-gray-700 border-b">
            <th className="p-3">Course Name</th>
            <th className="p-3">Instructor</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, idx) => (
            <tr key={idx} className="border-b last:border-none">
              <td className="p-3">{course.name}</td>
              <td className="p-3">{course.instructor}</td>
              <td className="p-3">{course.date}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    course.status === "Completed"
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-accent)]"
                  }`}
                >
                  {course.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium px-6 py-2 rounded-lg shadow-md">
          Browse All Courses
        </button>
      </div>
    </div>
  );
};

export default CourseTable;
