import React from 'react'
import { FiBookOpen, FiClock, FiUsers, FiPlayCircle, FiAward, FiStar, FiGlobe, FiBriefcase, FiMail, FiLinkedin, FiTwitter, FiGithub } from "react-icons/fi";
import { Award, GraduationCap, Target, Sparkles,  Mail} from "lucide-react";

export default function AboutInstructor({ instructor }) {

  return (
    <section className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-emerald-100 shadow-[var(--shadow-medium)] overflow-hidden mb-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--color-primary)]/5 to-emerald-500/5 p-6 border-b border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[var(--color-text)]">
              About the Instructor
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-emerald-100 text-[var(--color-primary)] px-3 py-1 rounded-full text-sm font-medium">
            <Award className="w-4 h-4" />
            <span>Expert Instructor</span>
          </div>
        </div>
        <p className="text-sm text-[var(--color-text)]/70">
          Learn directly from industry experts with real-world experience
        </p>
      </div>

      <div className="p-6">
        {/* Instructor Profile */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          {/* Profile Image & Badge */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
              <img
                src={instructor?.picture || '/images/teacher.png'}
                alt={instructor?.userId?.name || 'Instructor'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Pro
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text)]">
                  {instructor?.userId?.name || 'Instructor Name'}
                </h3>
                <p className="text-lg font-medium text-[var(--color-primary)] mb-2">
                  {instructor?.designation || 'Senior Instructor'}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {instructor?.linkedin && (
                  <a href={instructor.linkedin} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                )}
                {instructor?.twitter && (
                  <a href={instructor.twitter} className="p-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors">
                    <FiTwitter className="w-5 h-5" />
                  </a>
                )}
                {instructor?.github && (
                  <a href={instructor.github} className="p-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiGithub className="w-5 h-5" />
                  </a>
                )}
                {instructor?.email && (
                  <a href={`mailto:${instructor.email}`} className="p-2 bg-emerald-50 text-[var(--color-primary)] hover:bg-emerald-100 rounded-lg transition-colors">
                    <FiMail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h4 className="font-bold text-lg text-[var(--color-text)]">Professional Bio</h4>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-50/30 rounded-xl p-5 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              {instructor?.userId?.intro || 'Passionate educator with extensive industry experience...'}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {instructor?.description || 'Dedicated to providing high-quality education and mentoring students to achieve their career goals.'}
            </p>
          </div>
        </div>

        {/* Expertise & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Areas of Expertise */}
          <div className="bg-gradient-to-br from-blue-50/50 to-blue-50/30 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-lg text-[var(--color-text)]">Areas of Expertise</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {instructor?.expertise?.map((skill, index) => (
                <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              )) || ['Web Development', 'Cloud Computing', 'Data Science', 'AI/ML'].map((skill, index) => (
                <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      
      </div>
    </section>
  );
}

// Helper Icons
const BookOpen = FiBookOpen;
const Clock = FiClock;
const Users = FiUsers;
const PlayCircle = FiPlayCircle;
const Star = FiStar;