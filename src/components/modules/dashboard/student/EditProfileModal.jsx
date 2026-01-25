"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function EditProfileModal({ profile, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(() => ({
    ...profile,
    dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
  }));

  useEffect(() => {
    setFormData({
      ...profile,
      dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
    });
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg text-[var(--color-text)] shadow-lg p-6 w-full max-w-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text)]">Edit Profile</h2>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 rounded-md"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="School/Organization"
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="Region"
                className="border p-2 rounded-md"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                className="border p-2 rounded-md"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Bio */}
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border p-2 rounded-md w-full mt-4"
              rows={4}
            />

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
