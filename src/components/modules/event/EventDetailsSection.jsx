import React from 'react'
import {
  FaCalendarAlt,
  FaStar,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineEmojiPeople, MdVerified } from 'react-icons/md';


const EventDetailsSection = ({activeTab,setActiveTab,eventData,handleRegister}) => {
return (
<section className="relative py-20">
    <div className="container mx-auto px-4">
    <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
        {/* Tabs */}
        <div className="mb-8">
            <nav className="flex flex-wrap gap-4">
            {["details", "speakers", "schedule", "faq"].map((tab) => (
                <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-3 font-semibold capitalize transition-all ${
                    activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
                >
                {tab}
                </button>
            ))}
            </nav>
        </div>

        {/* Tab Content */}
        <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
            {activeTab === "details" && (
            <div>
                <h3 className="mb-6 text-3xl font-bold text-gray-800">
                About This Event
                </h3>
                <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                Join us for an immersive 3-hour masterclass where
                industry leaders will share their insights on the latest
                trends in digital marketing. This event is perfect for
                marketers, entrepreneurs, and anyone looking to enhance
                their digital presence.
                </p>

                <h4 className="mb-6 text-2xl font-semibold text-gray-800">
                What You'll Learn
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                {[
                    "Advanced SEO strategies for 2024",
                    "Social media marketing automation",
                    "Data-driven content creation",
                    "Conversion rate optimization techniques",
                    "AI-powered marketing tools",
                    "Personalized customer journey mapping",
                ].map((item, index) => (
                    <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition-all hover:bg-gray-100"
                    >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <FaArrowRight className="text-white text-sm" />
                    </div>
                    <span className="font-medium text-gray-700">
                        {item}
                    </span>
                    </div>
                ))}
                </div>
            </div>
            )}

            {activeTab === "speakers" && (
            <div>
                <h3 className="mb-6 text-3xl font-bold text-gray-800">
                Featured Speakers
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((speaker) => (
                    <div
                    key={speaker}
                    className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-white to-gray-50 p-6 shadow-lg border border-gray-100"
                    >
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-green-400 shadow-lg" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xl font-bold text-gray-800">
                            Speaker {speaker}
                        </h4>
                        <MdVerified className="text-blue-500 text-xl" />
                        </div>
                        <p className="text-gray-600 mb-2">
                        Digital Marketing Expert
                        </p>
                        <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className="text-yellow-400 text-sm"
                            />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            4.9 (128 reviews)
                        </span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}

            {activeTab === "schedule" && (
            <div>
                <h3 className="mb-6 text-3xl font-bold text-gray-800">
                Event Schedule
                </h3>
                <div className="space-y-6">
                {[
                    {
                    time: "6:00 PM",
                    title: "Welcome & Introduction",
                    duration: "15 min",
                    icon: "👋",
                    },
                    {
                    time: "6:15 PM",
                    title: "Keynote: Future of Digital Marketing",
                    duration: "45 min",
                    icon: "🎤",
                    },
                    {
                    time: "7:00 PM",
                    title: "Breakout Sessions",
                    duration: "1 hour",
                    icon: "💡",
                    },
                    {
                    time: "8:00 PM",
                    title: "Networking Session",
                    duration: "45 min",
                    icon: "🤝",
                    },
                    {
                    time: "8:45 PM",
                    title: "Closing Remarks",
                    duration: "15 min",
                    icon: "🎯",
                    },
                ].map((session, index) => (
                    <div
                    key={index}
                    className="flex items-center gap-6 rounded-2xl bg-gradient-to-r from-white to-gray-50 p-6 shadow-lg border border-gray-100"
                    >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-2xl">
                        {session.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">
                            {session.title}
                            </h4>
                            <p className="text-gray-600">
                            {session.duration}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-gray-800">
                            {session.time}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}

            {activeTab === "faq" && (
            <div>
                <h3 className="mb-6 text-3xl font-bold text-gray-800">
                Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                {[
                    {
                    q: "Is this event free to attend?",
                    a: "Yes, this event is completely free for all attendees. We believe in making quality education accessible to everyone.",
                    },
                    {
                    q: "Will the sessions be recorded?",
                    a: "Yes, all sessions will be recorded and available for registered attendees to watch later at their convenience.",
                    },
                    {
                    q: "Can I ask questions during the event?",
                    a: "Absolutely! There will be dedicated Q&A sessions and live chat support throughout the event.",
                    },
                    {
                    q: "What platform will be used for the online event?",
                    a: "We'll be using a custom platform with Zoom integration for the best interactive experience.",
                    },
                    {
                    q: "Will I get a certificate of participation?",
                    a: "Yes, all attendees who complete the event will receive a digital certificate of participation.",
                    },
                ].map((faq, index) => (
                    <div
                    key={index}
                    className="rounded-2xl bg-gradient-to-r from-white to-gray-50 p-6 shadow-lg border border-gray-100 transition-all hover:shadow-xl"
                    >
                    <h4 className="mb-3 text-xl font-semibold text-gray-800">
                        {faq.q}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                        {faq.a}
                    </p>
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
        {/* Event Info Card */}
        <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">
            Event Information
            </h3>
            <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <FaCalendarAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                <p className="font-semibold text-gray-700">
                    Date & Time
                </p>
                <p className="text-gray-600">
                    {new Date(eventData.date).toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    }
                    )}
                </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <FaMapMarkerAlt className="text-green-600 text-xl" />
                </div>
                <div>
                <p className="font-semibold text-gray-700">Location</p>
                <p className="text-gray-600">{eventData.location}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <FaClock className="text-purple-600 text-xl" />
                </div>
                <div>
                <p className="font-semibold text-gray-700">Duration</p>
                <p className="text-gray-600">{eventData.duration}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <FaUsers className="text-orange-600 text-xl" />
                </div>
                <div>
                <p className="font-semibold text-gray-700">Attendees</p>
                <p className="text-gray-600">
                    {eventData.attendees.toLocaleString()} registered
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* Organizer Card */}
        <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">
            Organizer
            </h3>
            <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg" />
            <div>
                <div className="flex items-center gap-2 mb-1">
                <h4 className="text-xl font-bold text-gray-800">
                    {eventData.organizer}
                </h4>
                {eventData.organizerVerified && (
                    <MdVerified className="text-blue-500 text-xl" />
                )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                <MdOutlineEmojiPeople />
                <span>
                    ⭐ {eventData.rating} (
                    {eventData.reviews.toLocaleString()} reviews)
                </span>
                </div>
            </div>
            </div>
        </div>

        {/* Registration Card */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold">Ready to Join?</h3>
            <p className="mb-6 opacity-90 leading-relaxed">
            Don't miss this opportunity to learn from the best in the
            industry. Limited spots available!
            </p>
            <button
            onClick={handleRegister}
            className="w-full rounded-2xl bg-white px-6 py-4 font-bold text-blue-600 transition-all hover:bg-gray-100 hover:shadow-lg transform hover:scale-105"
            >
            Register Now - {eventData.price}
            </button>
            <p className="mt-4 text-center text-sm opacity-80">
            🎁 Bonus materials included for all attendees
            </p>
        </div>
        </div>
    </div>
    </div>
</section>
)
}

export default EventDetailsSection