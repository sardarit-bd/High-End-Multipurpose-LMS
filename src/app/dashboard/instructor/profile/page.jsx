"use client";
import React, { useState } from "react";
import { Pencil, Briefcase, GraduationCap, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InstructorProfile = () => {
  const [showEdit, setShowEdit] = useState(false);

  const profile = {
    firstName: "Eugene",
    lastName: "Andre",
    username: "instructordemo",
    phone: "89104-71829",
    gender: "Male",
    dob: "16 Jan 2020",
    bio: "I am a web developer with a vast array of knowledge in many different front end and back end languages, responsive frameworks, databases, and best code practices.",
    registrationDate: "16 Jan 2024, 11:15 AM",
    email: "instructordemo@example.com",
    age: 24,
  };

  const education = [
    {
      title: "BCA - Bachelor of Computer Applications",
      university: "International University",
      duration: "2004 - 2010",
    },
    {
      title: "MCA - Master of Computer Application",
      university: "International University",
      duration: "2010 - 2012",
    },
    {
      title: "Design Communication Visual",
      university: "International University",
      duration: "2012 - 2015",
    },
  ];

  const experience = [
    {
      role: "Web Design & Development Team Leader",
      company: "Creative Agency",
      duration: "2013 - 2016",
    },
    {
      role: "Project Manager",
      company: "CJobcy Technology Pvt.Ltd.",
      duration: "Present",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Profile</h2>
        <button
          onClick={() => setShowEdit(true)}
          className="text-gray-500 hover:text-[var(--color-primary)] transition"
        >
          <Pencil size={18} />
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="font-semibold mb-4">Basic Information</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-3 text-sm">
          <p>
            <span className="font-medium text-gray-700">First Name:</span>{" "}
            {profile.firstName}
          </p>
          <p>
            <span className="font-medium text-gray-700">Last Name:</span>{" "}
            {profile.lastName}
          </p>
          <p>
            <span className="font-medium text-gray-700">Registration Date:</span>{" "}
            {profile.registrationDate}
          </p>
          <p>
            <span className="font-medium text-gray-700">User Name:</span>{" "}
            {profile.username}
          </p>
          <p>
            <span className="font-medium text-gray-700">Phone Number:</span>{" "}
            {profile.phone}
          </p>
          <p>
            <span className="font-medium text-gray-700">Email:</span>{" "}
            {profile.email}
          </p>
          <p>
            <span className="font-medium text-gray-700">Gender:</span>{" "}
            {profile.gender}
          </p>
          <p>
            <span className="font-medium text-gray-700">DOB:</span> {profile.dob}
          </p>
          <p>
            <span className="font-medium text-gray-700">Age:</span> {profile.age}
          </p>
        </div>
        <div className="mt-4">
          <p className="font-medium text-gray-700 mb-1">Bio</p>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="font-semibold mb-4">Education</h3>
        <ul className="space-y-3">
          {education.map((item, i) => (
            <li key={i} className="border-b last:border-none pb-3">
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <GraduationCap className="text-[var(--color-primary)]" size={18} />
                {item.title}
              </p>
              <p className="text-gray-500 text-sm">
                {item.university} - ({item.duration})
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Experience */}
      <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="font-semibold mb-4">Experience</h3>
        <ul className="space-y-3">
          {experience.map((item, i) => (
            <li
              key={i}
              className="border-b last:border-none pb-3 flex items-start gap-3"
            >
              <div className="mt-1">
                <Briefcase className="text-[var(--color-primary)]" size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.role}</p>
                <p className="text-gray-500 text-sm">
                  {item.company} - ({item.duration})
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={() => setShowEdit(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">First Name</label>
                  <input
                    type="text"
                    defaultValue={profile.firstName}
                    className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Last Name</label>
                  <input
                    type="text"
                    defaultValue={profile.lastName}
                    className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input
                    type="text"
                    defaultValue={profile.phone}
                    className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    defaultValue={profile.email}
                    className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Gender</label>
                  <select className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-[var(--color-primary)]">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">DOB</label>
                  <input
                    type="date"
                    className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-[var(--color-primary)]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-600">Bio</label>
                  <textarea
                    defaultValue={profile.bio}
                    rows="3"
                    className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-[var(--color-primary)]"
                  ></textarea>
                </div>

                <div className="sm:col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstructorProfile;
