"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiBookOpen, 
  FiUsers, 
  FiLinkedin, 
  FiTwitter, 
  FiGithub, 
  FiGlobe, 
  FiFacebook, 
  FiInstagram,
  FiAward,
  FiTool,
  FiCalendar
} from "react-icons/fi";
import { useInstructorById } from "@/hooks/useAuth";
import { usePublicCourses } from "@/hooks/useCourse";

export default function InstructorProfile() {
  const { slug } = useParams();
  
  const { data: instructorData, isLoading: instructorLoading } = useInstructorById(slug);
  const { data: coursesData } = usePublicCourses({ 
    instructor: slug,
    status: "published",
    limit: 1000
  });
  
  const stats = useMemo(() => {
    if (!coursesData?.items) return { totalCourses: 0, totalStudents: 0, totalLessons: 0 };
    
    const courses = coursesData.items;
    const totalCourses = courses.length;
    const totalLessons = courses.reduce((sum, course) => sum + (course.lessonCount || 0), 0);
    const totalStudents = instructorData?.enrolledStudent || 0;
    
    return {
      totalCourses,
      totalStudents,
      totalLessons
    };
  }, [coursesData, instructorData]);

  if (instructorLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gradient-to-r from-[var(--color-primary)] to-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 font-medium">Loading instructor profile...</p>
        </div>
      </div>
    );
  }

  if (!instructorData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
            <FiUsers className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-gray-800 font-semibold text-lg mb-2">Instructor not found</p>
          <p className="text-gray-500">The instructor profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const userData = instructorData.userId || {};
  const instructorInfo = instructorData || {};
  
  const profileImage = userData.picture || "/images/teacher.png";
  const name = userData.name || "Instructor";
  const designation = instructorInfo.designation || "";
  const intro = userData.intro || "";
  const email = userData.email || "";
  const phone = userData.phone || "";
  const address = userData.address || "";
  const socialLinks = userData.socialLinks || {};
  const certifications = instructorInfo.certificates || instructorInfo.certifications || [];
  const expertise = instructorInfo.expertise || [];
  const joinDate = userData.createdAt 
    ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : "";

  const socialIcons = [
    { key: 'linkedin', icon: FiLinkedin, color: 'hover:text-blue-700' },
    { key: 'twitter', icon: FiTwitter, color: 'hover:text-sky-500' },
    { key: 'github', icon: FiGithub, color: 'hover:text-gray-800' },
    { key: 'website', icon: FiGlobe, color: 'hover:text-emerald-600' },
    { key: 'facebook', icon: FiFacebook, color: 'hover:text-blue-600' },
    { key: 'instagram', icon: FiInstagram, color: 'hover:text-pink-600' }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* ===== Left/Main Content ===== */}
        <div className="flex-1 space-y-8">
          {/* Profile Header Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Image */}
              <div className="relative">
                <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={profileImage}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-[var(--color-primary)] to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {name}
                  </h1>
                  {designation && (
                    <p className="text-lg font-semibold text-gray-500 mt-1">
                      {designation}
                    </p>
                  )}
                  {joinDate && (
                    <p className="text-sm text-gray-400 mt-2 flex items-center justify-center md:justify-start gap-2">
                      <FiCalendar className="w-4 h-4" />
                      Member since {joinDate}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-6">
                  {stats.totalCourses > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-blue-500 bg-clip-text text-transparent">
                        {stats.totalCourses}
                      </div>
                      <div className="text-sm text-gray-500">Courses</div>
                    </div>
                  )}
                  {stats.totalStudents > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                        {stats.totalStudents.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Students</div>
                    </div>
                  )}
                  {stats.totalLessons > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {stats.totalLessons}+
                      </div>
                      <div className="text-sm text-gray-500">Lessons</div>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {socialIcons.map(({ key, icon: Icon, color }) => 
                    socialLinks[key] && (
                      <a
                        key={key}
                        href={socialLinks[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110 ${color}`}
                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About Me */}
          {intro && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-base">
                {intro}
              </p>
            </div>
          )}

          {/* Expertise */}
          {expertise.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <FiTool className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900">Areas of Expertise</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-100 hover:shadow-md transition-shadow duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== Right Sidebar ===== */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-20 h-fit">
          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-xl p-8 border border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <FiAward className="w-6 h-6 text-emerald-500" />
                <h3 className="font-bold text-gray-900 text-lg">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/70 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300 group hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiAward className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {cert}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details */}
          {(email || phone || address) && (
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <FiMail className="w-6 h-6 text-blue-500" />
                <h3 className="font-bold text-gray-900 text-lg">Contact Details</h3>
              </div>
              <ul className="space-y-4">
                {email && (
                  <li className="flex items-center gap-4 p-3 bg-white/50 rounded-xl border border-blue-50 hover:border-blue-200 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-5 h-5 text-blue-600" />
                    </div>
                    <a 
                      href={`mailto:${email}`} 
                      className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors truncate"
                    >
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-4 p-3 bg-white/50 rounded-xl border border-blue-50 hover:border-blue-200 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-5 h-5 text-green-600" />
                    </div>
                    <a 
                      href={`tel:${phone}`} 
                      className="text-sm text-gray-700 hover:text-green-600 font-medium transition-colors"
                    >
                      {phone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="flex items-center gap-4 p-3 bg-white/50 rounded-xl border border-blue-50 hover:border-blue-200 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {address}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}