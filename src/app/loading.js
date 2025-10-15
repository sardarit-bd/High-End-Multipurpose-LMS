"use client";

import { FaGraduationCap } from "react-icons/fa";
import { MdVerified, MdPerson } from "react-icons/md";

export default function HeroSectionSkeleton() {
    return (
        <section className="relative bg-gray-50 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="h-full w-full bg-gradient-to-b from-gray-200 to-gray-100 opacity-40" />
            </div>

            {/* Skeleton content */}
            <div className="relative z-10 mx-auto flex min-h-[80vh] flex-col justify-center px-6 py-16 md:flex-row md:items-center md:gap-10 lg:px-20">
                {/* Left side */}
                <div className="flex-1 space-y-5 animate-pulse">
                    <div className="h-5 w-48 rounded-full bg-gray-300" />
                    <div className="space-y-3">
                        <div className="h-8 w-3/4 rounded-md bg-gray-300" />
                        <div className="h-8 w-1/2 rounded-md bg-gray-300" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 w-11/12 rounded-md bg-gray-200" />
                        <div className="h-3 w-10/12 rounded-md bg-gray-200" />
                        <div className="h-3 w-8/12 rounded-md bg-gray-200" />
                    </div>
                    <div className="mt-6 h-14 w-full max-w-lg rounded-lg bg-gray-200" />

                    {/* Stats placeholders */}
                    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {[FaGraduationCap, MdVerified, MdPerson].map((Icon, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-xl bg-white/80 p-4 shadow-sm"
                            >
                                <Icon className="text-2xl text-gray-400" />
                                <div className="space-y-1">
                                    <div className="h-3 w-12 bg-gray-200 rounded-md" />
                                    <div className="h-3 w-16 bg-gray-200 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side (video placeholder) */}
                <div className="flex-1 flex justify-center md:justify-end animate-pulse">
                    <div className="h-[300px] w-[90%] max-w-md rounded-xl bg-gray-300 shadow-inner" />
                </div>
            </div>
        </section>
    );
}
