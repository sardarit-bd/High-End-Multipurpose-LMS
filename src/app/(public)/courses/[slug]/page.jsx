"use client";
import { useMemo, useEffect, useState } from "react";
import AboutInstructor from "@/components/modules/courses/AboutInstructor";
import CourseContent from "@/components/modules/courses/CourseContent";
import { FiHeart, FiShare2, FiPlay, FiDownload, FiSmartphone, FiTv, FiAward, FiClock, FiUsers, FiBarChart2 } from "react-icons/fi";
import CourseSingleSkeleton from "@/components/modules/special/CourseSingleSkeleton";
import { useParams } from "next/navigation";
import { useSlugCourses, useUnitsByCourse, useCourseStats, useEnrollmentCourses } from "@/hooks/useCourse";
import { useAuth, useInstructorById } from "@/hooks/useAuth";
import api from "@/lib/apiClient";
import Link from "next/link";
import Image from "next/image";

export default function CourseSinglePage() {
    const { slug } = useParams()
    const { user } = useAuth()
    const [enrolled, setEnrolled] = useState(false)

    const { data: course, isLoading: courseLoading } = useSlugCourses(slug);
    const { data: instructor, isLoading: instructorLoading } = useInstructorById(course?.instructor);
    const { data: units = [], isLoading: unitsLoading } = useUnitsByCourse(course?._id);
    const unitIds = useMemo(() => units.map(u => u._id), [units]);
    const { data: courseStats } = useCourseStats(course?._id, unitIds);
    const [allLessons, setAllLessons] = useState([]);
    const { data: EnrolledCourse} = useEnrollmentCourses(user?._id);
    
     useEffect(() => {
        if (EnrolledCourse && slug) {
            const isEnrolled = EnrolledCourse.some((enrollment) => enrollment.course?.slug === slug);
            setEnrolled(isEnrolled);
        } else {
            setEnrolled(false);
        }
    }, [EnrolledCourse, slug]);

    // Fetch all lessons for all units
    useEffect(() => {
        if (units.length === 0) {
            setAllLessons([]);
            return;
        }

        const fetchAllLessons = async () => {
            try {
                const lessonPromises = units.map(unit => 
                    api.get(`/lessons/${unit._id}`).then(res => res.data?.data || [])
                );
                const lessonsArrays = await Promise.all(lessonPromises);
                setAllLessons(lessonsArrays.flat());
            } catch (error) {
                console.error("Error fetching lessons:", error);
                setAllLessons([]);
            }
        };

        fetchAllLessons();
    }, [units]);

    // Calculate dynamic stats - ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
    const totalDurationSeconds = useMemo(() => {
        return allLessons.reduce((sum, lesson) => sum + (lesson.durationSec || 0), 0);
    }, [allLessons]);

    const videoLessons = useMemo(() => {
        return allLessons.filter(lesson => lesson.contentType === "video");
    }, [allLessons]);

    const videoDurationSeconds = useMemo(() => {
        return videoLessons.reduce((sum, lesson) => sum + (lesson.durationSec || 0), 0);
    }, [videoLessons]);

    const downloadableResources = useMemo(() => {
        return allLessons.filter(lesson => 
            lesson.contentType === "pdf" || lesson.contentType === "audio"
        ).length;
    }, [allLessons]);

    // Format duration helper functions (defined as regular functions, not hooks)
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minute${minutes > 1 ? 's' : ''}` : ''}`;
        }
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    };

    const formatDurationShort = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
        }
        return `${minutes}m`;
    };

    // Dynamic course features
    const courseFeatures = useMemo(() => {
        const features = [];
        
        if (courseStats?.enrollmentCount !== undefined) {
            features.push({
                icon: <FiUsers className="w-4 h-4" />,
                text: `Enrolled: ${courseStats.enrollmentCount} student${courseStats.enrollmentCount !== 1 ? 's' : ''}`
            });
        }
        
        if (totalDurationSeconds > 0) {
            features.push({
                icon: <FiClock className="w-4 h-4" />,
                text: `Duration: ${formatDurationShort(totalDurationSeconds)}`
            });
        }
        
        if (units.length > 0) {
            features.push({
                icon: <FiBarChart2 className="w-4 h-4" />,
                text: `Chapters: ${units.length}`
            });
        }
        
        if (videoDurationSeconds > 0) {
            features.push({
                icon: <FiPlay className="w-4 h-4" />,
                text: `Video: ${formatDurationShort(videoDurationSeconds)}`
            });
        }
        
        if (course?.level) {
            features.push({
                icon: <FiAward className="w-4 h-4" />,
                text: `Level: ${course.level.charAt(0).toUpperCase() + course.level.slice(1)}`
            });
        }
        
        return features;
    }, [courseStats, totalDurationSeconds, units.length, videoDurationSeconds, course?.level]);

    // Dynamic includes list
    const includesList = useMemo(() => {
        const includes = [];
        
        if (videoDurationSeconds > 0) {
            includes.push({
                icon: <FiPlay className="w-4 h-4" />,
                text: `${formatDuration(videoDurationSeconds)} on-demand video`
            });
        }
        
        if (downloadableResources > 0) {
            includes.push({
                icon: <FiDownload className="w-4 h-4" />,
                text: `${downloadableResources} downloadable resource${downloadableResources !== 1 ? 's' : ''}`
            });
        }
        
        // Always available features
        includes.push({
            icon: <FiClock className="w-4 h-4" />,
            text: "Full lifetime access"
        });
        
        includes.push({
            icon: <FiSmartphone className="w-4 h-4" />,
            text: "Access on mobile and TV"
        });
        
        if (courseStats?.tasksCount > 0) {
            includes.push({
                icon: <FiAward className="w-4 h-4" />,
                text: `${courseStats.tasksCount} assignment${courseStats.tasksCount !== 1 ? 's' : ''}`
            });
        }
        
        if (course?.awardOnComplete) {
            includes.push({
                icon: <FiAward className="w-4 h-4" />,
                text: "Certificate of completion"
            });
        }
        
        return includes;
    }, [videoDurationSeconds, downloadableResources, courseStats?.tasksCount, course?.awardOnComplete]);

    // Get video source - introVideo first, then thumbnail
    const videoSource = useMemo(() => course?.introVideo || course?.thumbnail, [course?.introVideo, course?.thumbnail]);

    // NOW we can do conditional returns AFTER all hooks
    if (courseLoading || instructorLoading || unitsLoading) return <CourseSingleSkeleton />;

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ===== Left Content ===== */}
                    <div className="flex-1">
                        {/* Video Banner */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-0"></div>
                            {videoSource ? (
                                course?.introVideo ? (
                                    <video
                                        controls
                                        autoPlay={false}
                                        muted={true}
                                        loop={true}
                                        className="w-full aspect-video object-cover rounded-2xl transform group-hover:scale-[1.01] transition-transform duration-300"
                                    >
                                        <source src={course.introVideo} type="video/mp4" />
                                        Your browser does not support video playback.
                                    </video>
                                ) : (
                                    <div className="relative w-full aspect-video">
                                        <Image
                                            src={course.thumbnail}
                                            alt={course.title || "Course thumbnail"}
                                            fill
                                            className="object-cover rounded-2xl transform group-hover:scale-[1.01] transition-transform duration-300"
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                                    <p className="text-gray-500">No preview available</p>
                                </div>
                            )}
                            {course?.introVideo && (
                                <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                                    Preview
                                </div>
                            )}
                        </div>

                        {/* Overview */}
                        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-6 bg-gradient-to-b from-[var(--color-primary)] to-blue-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-base">
                                {course?.description}
                            </p>
                        </section>
                        
                        <CourseContent units={units} />
                        <AboutInstructor instructor={instructor} />
                    </div>

                    {/* ===== Right Sidebar ===== */}
                    <aside className="w-full lg:w-96 flex-shrink-0 lg:sticky lg:top-24 self-start space-y-6">
                        {/* Price & Enroll Card */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                {course?.price ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-blue-600 bg-clip-text text-transparent">
                                            ${course?.price}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">${(course?.price * 2).toFixed(2)}</span>
                                    </div>
                                ) : (
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                                        FREE
                                    </h3>
                                )}
                                {/* <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                    50% OFF
                                </span> */}
                            </div>

                            {/* <div className="flex gap-3 mb-6">
                                <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
                                    <FiHeart className="group-hover:text-red-500 transition-colors" /> 
                                    <span>Wishlist</span>
                                </button>
                                <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
                                    <FiShare2 className="group-hover:text-blue-500 transition-colors" /> 
                                    <span>Share</span>
                                </button>
                            </div> */}

                            <div className="space-y-3">
                                {!user ? (
                                    <Link 
                                        href={`/login?redirect=${slug}`}
                                        className="block w-full bg-gradient-to-r from-[var(--color-primary)] to-blue-600 hover:from-blue-600 hover:to-[var(--color-primary)] text-white px-6 py-3.5 rounded-xl text-center font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Login to Enroll
                                    </Link>
                                ) : enrolled ? (
                                    <Link 
                                        href={`/dashboard/student/courses`}
                                        className="block w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-500 text-white px-6 py-3.5 rounded-xl text-center font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Continue Learning
                                    </Link>
                                ) : (
                                    <Link 
                                        href={`/checkout?slug=${slug}`}
                                        className={`block w-full bg-gradient-to-r from-[var(--color-primary)] to-blue-600 hover:from-blue-600 hover:to-[var(--color-primary)] text-white px-6 py-3.5 rounded-xl text-center font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${user?.role?.toLowerCase() === 'instructor' ? 'pointer-events-none opacity-60' : ''}`}
                                    >
                                        Enroll Now
                                    </Link>
                                )}
                            </div>

                            <p className="text-center text-gray-500 text-sm mt-4">
                                30-Day Money-Back Guarantee
                            </p>
                        </div>

                        {/* Includes Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                                <h4 className="font-bold text-gray-900 text-lg">Includes</h4>
                            </div>
                            <ul className="space-y-4">
                                {includesList.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700 group">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                                            {item.icon}
                                        </div>
                                        <span className="text-sm font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Course Features Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-1.5 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                <h4 className="font-bold text-gray-900 text-lg">Course Features</h4>
                            </div>
                            <ul className="space-y-4">
                                {courseFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700 group">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                                            {feature.icon}
                                        </div>
                                        <span className="text-sm font-medium">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}