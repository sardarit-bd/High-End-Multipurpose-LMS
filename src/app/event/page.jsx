"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/modules/headers/Navbar";
import EventHerosection from "@/components/modules/event/EventHerosection";
import EventDetailsSection from "@/components/modules/event/EventDetailsSection";
import EventTestimonialsSection from "@/components/modules/event/EventTestimonialsSection";
import Footer from "@/components/modules/footers/Footer";
import EventsPage from "@/components/modules/event/EventsPage";

const Event = () => {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Sample event data
  const eventData = {
    title: "Digital Marketing Masterclass 2024",
    date: "2024-12-15T18:00:00",
    location: "Online & In-person (Dhaka, Bangladesh)",
    duration: "3 hours",
    attendees: 1250,
    price: "Free",
    category: "Workshop",
    organizer: "Tech Academy BD",
    organizerVerified: true,
    rating: 4.8,
    reviews: 1247,
  };

  // Countdown timer
  useEffect(() => {
    const calculateCountdown = () => {
      const eventDate = new Date(eventData.date).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(calculateCountdown, 1000);
    calculateCountdown();

    return () => clearInterval(timer);
  }, []);

  const handleRegister = () => {
    // Registration logic here
    alert("Registration feature will be implemented soon!");
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: "Check out this amazing event!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <EventsPage/>

        {/* Testimonials Section */}
        <EventTestimonialsSection/>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Event;
