"use client";
import OurBenefits from '@/components/modules/home/OurBenefits'
import React from 'react'
import { useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaCertificate, FaUsers } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";
import AboutHero from '@/components/modules/about/AboutHero';


export default function About() {
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            q: "What’s DreamLMS want to give you?",
            a: "DreamLMS aims to provide you with a comprehensive and intuitive learning platform that enhances your educational experience.",
        },
        {
            q: "Why choose us for your education?",
            a: "We offer certified tutors, high-quality courses, and lifetime access with global recognition.",
        },
        {
            q: "How we provide service for you?",
            a: "We provide 24/7 support, flexible learning paths, and personalized mentoring for all learners.",
        },
    ];

    const instructors = [
        {
            name: "Brenda Slaton",
            role: "Designer",
            text: "This mentor helped me understand concepts that I...",
            img: "/images/student-1.jpg",
        },
        {
            name: "Adrian Dennis",
            role: "Developer",
            text: "I’ve learned so much from my mentor’s personal e...",
            img: "/images/student-2.jpg",
        },
        {
            name: "Adrian Coztanza",
            role: "Architect",
            text: "The advice was useful, but I wish my mentor had...",
            img: "/images/student-1.jpg",
        },
    ]

    return (
        <div className='w-full min-h-screen bg-white'>
           <AboutHero />
            <OurBenefits />

            <div className="py-[var(--spacing-section)] bg-black mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 container mx-auto px-4">
                    <div className="flex flex-col items-center text-white">
                        <FaUserGraduate size={32} />
                        <h3 className="font-bold text-lg mt-2">10K</h3>
                        <p className="text-sm">Online Courses</p>
                    </div>
                    <div className="flex flex-col items-center text-white">
                        <FaChalkboardTeacher size={32} />
                        <h3 className="font-bold text-lg mt-2">200+</h3>
                        <p className="text-sm">Expert Tutors</p>
                    </div>
                    <div className="flex flex-col items-center text-white">
                        <FaCertificate size={32} />
                        <h3 className="font-bold text-lg mt-2">6K+</h3>
                        <p className="text-sm">Certified Courses</p>
                    </div>
                    <div className="flex flex-col items-center text-white">
                        <FaUsers size={32} />
                        <h3 className="font-bold text-lg mt-2">60K+</h3>
                        <p className="text-sm">Online Students</p>
                    </div>
                </div>
            </div>

            {/* === Instructors Section === */}
            <section className="py-[var(--spacing-section)] bg-[var(--color-background)]">
               <div className='container mx-auto px-4'>
                 <h2 className="text-center text-2xl font-bold text-[var(--color-text)] mb-2">
                    Top Class & Professional Instructors
                </h2>
                <p className="text-center text-sm text-gray-600 mb-8">
                    Words from those who’ve experienced real growth.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instructors.map((ins, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-md rounded-[var(--radius-card)] p-6 text-center hover:shadow-lg transition"
                        >
                            <Image
                                src={ins.img}
                                alt={ins.name}
                                width={180}
                                height={180}
                                className="mx-auto rounded-full mb-3"
                            />
                            <h3 className="font-semibold text-[var(--color-text)]">{ins.name}</h3>
                            <p className="text-sm text-gray-500">{ins.role}</p>
                            <p className="text-sm text-gray-600 mt-3">{ins.text}</p>
                            <div className="flex justify-center mt-3 text-[var(--color-accent)]">
                                {"★★★★★"}
                            </div>
                        </div>
                    ))}
                </div>
               </div>
            </section>

            {/* === FAQ Section === */}
            <section className="py-[var(--spacing-section)]  container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
                {/* Image Left */}
                <div>
                    <Image
                        src="/images/learning-journey.jpg"
                        alt="FAQ"
                        width={500}
                        height={400}
                        className="rounded-[var(--radius-card)] shadow-md"
                    />
                </div>

                {/* Accordion Right */}
                <div>
                    <h3 className="text-sm font-semibold text-[var(--color-accent)] mb-2">FAQs</h3>
                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Explore detailed answers to the most common questions about our platform.
                    </p>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="border rounded-[var(--radius-default)] shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="flex justify-between items-center w-full text-left px-4 py-3 font-medium text-[var(--color-text)]"
                                >
                                    {faq.q}
                                    {openFaq === i ? (
                                        <FiMinus className="text-[var(--color-primary)]" />
                                    ) : (
                                        <FiPlus className="text-gray-500" />
                                    )}
                                </button>
                                {openFaq === i && (
                                    <div className="px-4 pb-4 text-sm text-gray-600">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>



        </div>
    )
}
