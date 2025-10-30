"use client";
import AboutInstructor from "@/components/modules/courses/AboutInstructor";
import CommentForm from "@/components/modules/courses/CommentForm";
import CourseContent from "@/components/modules/courses/CourseContent";
import { FiHeart, FiShare2 } from "react-icons/fi";
import CourseSingleSkeleton from "@/components/modules/special/CourseSingleSkeleton";
import { useParams } from "next/navigation";
import { useSlugCourses, useUnitsByCourse } from "@/hooks/useCourse";
import { useInstructorById } from "@/hooks/useAuth";
import Link from "next/link";


export default function CourseSinglePage() {
    const { slug } = useParams()

    const { data: course, isLoading: courseLoading } = useSlugCourses(slug);
    const { data: instructor, isLoading: instructorLoading } = useInstructorById(course?.instructor);
    const { data: units, isLoading: unitsLoading } = useUnitsByCourse(course?._id);

    if (courseLoading, instructorLoading, unitsLoading) return <CourseSingleSkeleton />;

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ===== Left Content ===== */}
                    <div className="flex-1">
                        {/* Video Banner */}
                        <div className="rounded-[var(--radius-card)] overflow-hidden shadow-lg mb-6">
                            <video
                                controls
                                autoPlay={true}
                                muted={true}
                                loop={true}
                                //   poster="/thumbnail.jpg"
                                className="w-full rounded-[var(--radius-card)]"
                            >
                                <source src="https://res.cloudinary.com/dg83pvgls/video/upload/v1760356802/lms_z6l6o6.mp4" type="video/mp4" />
                                Your browser does not support video playback.
                            </video>
                        </div>

                        {/* Overview */}
                        <section className="bg-white shadow-sm rounded-[var(--radius-card)] p-6 mb-6">
                            <h2 className="text-xl font-semibold text-[var(--color-secondary)] mb-3">Overview</h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {course?.description}
                            </p>

                            {/* <div className="mb-4">
                                <h3 className="font-semibold text-[var(--color-text)] mb-1">Course Description</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {course?.description}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold text-[var(--color-text)] mb-1">What you'll learn</h3>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li>Become a UX Designer</li>
                                    <li>Build and test full mobile and web apps</li>
                                    <li>Add UX/UI skills to your CV</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-[var(--color-text)] mb-1">Requirements</h3>
                                <p className="text-sm text-gray-700">
                                    No prior experience needed. A free copy of Adobe XD can be downloaded from Adobe.
                                </p>
                            </div> */}
                        </section>
                        <CourseContent units={units} />
                        <AboutInstructor instructor={instructor} />
                        <CommentForm />
                    </div>

                    {/* ===== Right Sidebar ===== */}
                    <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-18 self-start">
                        <div className="bg-white rounded-[var(--radius-card)] shadow-md p-6 mb-6">
                            {course?.price ? <p className="text-2xl font-bold text-[var(--color-primary)] mb-1">${course?.price}</p> : <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-1">FREE</h3>}


                            <p className="text-sm text-[var(--color-accent)] font-semibold mb-4">50% OFF</p>

                            <div className="flex gap-3 mb-4">
                                <button className="flex-1 py-2 border text-[var(--color-text)] rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-50">
                                    <FiHeart /> Wishlist
                                </button>
                                <button className="flex-1 py-2 border text-[var(--color-text)] rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-50">
                                    <FiShare2 /> Share
                                </button>
                            </div>

                            <button className="w-full py-3 rounded-lg text-white font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-md">
                               <Link href={`/checkout?slug=${slug}`}>Enroll Now</Link>
                            </button>
                        </div>

                        {/* Includes */}
                        <div className="bg-white rounded-[var(--radius-card)] shadow-md p-6 mb-6">
                            <h4 className="font-semibold text-[var(--color-secondary)] mb-3">Includes</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>11 hours on-demand video</li>
                                <li>69 downloadable resources</li>
                                <li>Full lifetime access</li>
                                <li>Access on mobile and TV</li>
                                <li>Assignments</li>
                                <li>Certificate of completion</li>
                            </ul>
                        </div>

                        {/* Course Features */}
                        <div className="bg-white rounded-[var(--radius-card)] shadow-md p-6">
                            <h4 className="font-semibold text-[var(--color-secondary)] mb-3">Course Features</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>Enrolled: 32 students</li>
                                <li>Duration: 20 hours</li>
                                <li>Chapters: 15</li>
                                <li>Video: 12 hours</li>
                                <li>Level: Beginner</li>
                            </ul>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
