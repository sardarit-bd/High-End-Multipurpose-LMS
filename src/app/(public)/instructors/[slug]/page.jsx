"use client";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function InstructorProfile() {
  return (
    <div className="w-full min-h-screen text-[var(--color-text)] bg-white">
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* ===== Left/Main Content ===== */}
        <div className="flex-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-6">
            <img
              src="/images/ins1.jpg"
              alt="Rolands Granger"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text)]">
                  Rolands Granger
                </h2>
                <p className="text-sm text-gray-500">
                  Developer •{" "}
                  <span className="text-yellow-500">⭐ 4.9</span> (200 Reviews)
                </p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  I am a web developer with a vast array of knowledge in many
                  different front end and back end languages, responsive
                  frameworks, databases, and best code practices.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  📘 12+ Lessons
                </span>
                <span className="flex items-center gap-1">
                  👥 50 Students
                </span>
                <div className="flex gap-3 ml-auto text-[var(--color-primary)]">
                  <a href="#">Fb</a>
                  <a href="#">Ig</a>
                  <a href="#">Tw</a>
                  <a href="#">In</a>
                </div>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold text-[var(--color-text)] mb-2">
              About Me
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Very well thought out and articulate communication. Clear
              milestones, deadlines and fast work. Patience. Infinite patience.
              No shortcuts. Even if the client is being careless. Some quick
              example text to build on the card title and bulk the card’s
              content Moltin gives you platform.
            </p>
          </div>

          {/* Education */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold text-[var(--color-text)] mb-4">
              Education
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="font-medium text-sm">
                  BCA - Bachelor of Computer Applications
                </p>
                <p className="text-xs text-gray-500">
                  International University - (2004 - 2010)
                </p>
              </li>
              <li>
                <p className="font-medium text-sm">
                  MCA - Master of Computer Application
                </p>
                <p className="text-xs text-gray-500">
                  International University - (2010 - 2012)
                </p>
              </li>
              <li>
                <p className="font-medium text-sm">
                  Design Communication Visual
                </p>
                <p className="text-xs text-gray-500">
                  International University - (2012 - 2015)
                </p>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold text-[var(--color-text)] mb-4">
              Experience
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="font-medium text-sm">
                  Web Design & Development Team Leader
                </p>
                <p className="text-xs text-gray-500">
                  Creative Agency - (2013 - 2016)
                </p>
              </li>
              <li>
                <p className="font-medium text-sm">Project Manager</p>
                <p className="text-xs text-gray-500">
                  CJobcy Technology Pvt.Ltd - (Present)
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Right Sidebar ===== */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-20 h-fit">
          {/* Certifications */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold text-[var(--color-text)] mb-3">
              Certifications
            </h3>
            <div className="flex gap-3 flex-wrap">
              <img src="/images/cert1.svg" className="w-16 h-16" alt="cert" />
              <img src="/images/cert2.svg" className="w-16 h-16" alt="cert" />
              <img src="/images/cert3.svg" className="w-16 h-16" alt="cert" />
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold text-[var(--color-text)] mb-3">
              Contact Details
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FiMail className="text-[var(--color-primary)]" />
                jennywilson@example.com
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-[var(--color-primary)]" />
                877 Ferry Street, Huntsville, Alabama
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-[var(--color-primary)]" />
                +1(452) 125-6789
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
