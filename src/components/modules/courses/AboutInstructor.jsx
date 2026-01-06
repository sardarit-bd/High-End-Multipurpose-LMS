import React from 'react'
import { FiBookOpen, FiClock, FiUsers, FiPlayCircle } from "react-icons/fi";
export default function AboutInstructor({instructor}) {
    return (
        <section className="bg-white rounded-[var(--radius-card)] shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
                About the Instructor
            </h2>

            <div className="flex items-center gap-4 mb-4">
                <img
                    src={instructor?.picture || '/images/teacher.png'}
                    alt="Instructor"
                    className="w-16 h-16 rounded-full object-cover shadow"
                />
                <div>
                    <h3 className="font-semibold text-[var(--color-text)]">{instructor?.userId?.name}</h3>
                    <p className="text-sm text-gray-600">{instructor?.designation}</p>
                </div>
                <div className="ml-auto text-yellow-500 font-semibold flex items-center gap-1">
                    ★★★★★ <span className="text-sm text-gray-600">{instructor?.ratting}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-700 border-b pb-4 mb-4">
                <span className="flex items-center gap-1">
                    <FiBookOpen className="text-[var(--color-primary)]" /> {instructor?.noOfCourse}
                </span>
                <span className="flex items-center gap-1">
                    <FiPlayCircle className="text-[var(--color-secondary)]" /> 12+ Lessons
                </span>
                <span className="flex items-center gap-1">
                    <FiClock className="text-[var(--color-accent)]" /> 9hr 30min
                </span>
                <span className="flex items-center gap-1">
                    <FiUsers className="text-[var(--color-primary)]" /> {instructor?.enrolledStudent + " students enrolled"}
                </span>
            </div>

            <p className="text-sm text-gray-700 mb-4">
                {instructor?.userId?.intro}
            </p>

            <div className="mb-4">
                <h4 className="font-semibold text-[var(--color-text)] mb-2">Skills:</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {instructor?.skills?.toString()}, and more.
                </p>
            </div>

            {/* <div>
                <h4 className="font-semibold text-[var(--color-text)] mb-2">Available for:</h4>
                <ul className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                    <li>Full Time Office Work</li>
                    <li>Remote Work</li>
                    <li>Freelance</li>
                    <li>Contract</li>
                    <li>Worldwide</li>
                </ul>
            </div> */}
        </section>
    )
}
