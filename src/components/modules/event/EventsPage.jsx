"use client";

import React, { useState, useEffect } from 'react';
import EventFilters from './EventFilters';
import EventListing from './EventListing';
import EventHerosection from './EventHerosection';
import EventSkeleton from './EventSkeleton';
import { useTranslation } from 'react-i18next';

const EventsPage = () => {
  const { t } = useTranslation();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 500],
    date: 'all',
    level: 'all',
    type: 'all'
  });
  const [loading, setLoading] = useState(true);

  // All events data
  const allEventsData = [
    {
      id: 1,
      title: "Digital Marketing",
      highlightedText: "Masterclass",
      description: "Join the most anticipated digital marketing event of the year. Learn from industry experts and network with professionals from around the world.",
      type: "Workshop",
      date: "Dec 15, 2024",
      duration: "3 Hours",
      level: "Beginner",
      price: "$49.99",
      originalPrice: "$79.99",
      attendees: 2500,
      rating: 4.8,
      reviews: 1247,
      category: "MASTERCLASS",
      status: "LIVE",
      cardTitle: "Transform Your Digital Strategy",
      cardDescription: "Learn cutting-edge techniques from industry leaders and take your marketing skills to the next level.",
      features: [
        { icon: "🎯", text: "Practical" },
        { icon: "⚡", text: "Interactive" },
        { icon: "🤝", text: "Networking" },
        { icon: "📚", text: "Resources" }
      ],
      isTrending: true,
      isNew: false,
      tags: ["Marketing", "Digital", "SEO", "Social Media"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "Virtual",
      speaker: "Sarah Johnson",
      speakerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      title: "Web Development",
      highlightedText: "Bootcamp",
      description: "Intensive web development bootcamp covering modern frameworks and best practices. Build real projects and enhance your portfolio.",
      type: "Bootcamp",
      date: "Jan 20, 2024",
      duration: "8 Weeks",
      level: "Intermediate",
      price: "$199.99",
      originalPrice: "$299.99",
      attendees: 1800,
      rating: 4.9,
      reviews: 892,
      category: "BOOTCAMP",
      status: "COMING SOON",
      cardTitle: "Master Full-Stack Development",
      cardDescription: "Comprehensive training on frontend and backend technologies with hands-on projects.",
      features: [
        { icon: "💻", text: "Hands-on" },
        { icon: "🚀", text: "Project-based" },
        { icon: "👨‍💼", text: "Career Support" },
        { icon: "📱", text: "Mobile First" }
      ],
      isTrending: false,
      isNew: true,
      tags: ["Web Development", "React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "New York, NY",
      speaker: "Mike Chen",
      speakerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      title: "Data Science",
      highlightedText: "Conference",
      description: "Annual data science conference featuring top researchers and practitioners. Explore AI, ML, and data analytics trends.",
      type: "Conference",
      date: "Feb 10, 2024",
      duration: "2 Days",
      level: "Advanced",
      price: "$299.99",
      originalPrice: "$399.99",
      attendees: 3200,
      rating: 4.7,
      reviews: 1563,
      category: "CONFERENCE",
      status: "EARLY BIRD",
      cardTitle: "Advance Your Data Skills",
      cardDescription: "Deep dive into machine learning, AI, and data visualization with industry experts.",
      features: [
        { icon: "📊", text: "Analytics" },
        { icon: "🤖", text: "AI/ML" },
        { icon: "🔍", text: "Research" },
        { icon: "🌐", text: "Global" }
      ],
      isTrending: true,
      isNew: false,
      tags: ["Data Science", "AI", "Machine Learning", "Python"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "San Francisco, CA",
      speaker: "Dr. Emily Rodriguez",
      speakerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      title: "UX/UI Design",
      highlightedText: "Workshop",
      description: "Hands-on UX/UI design workshop focusing on user-centered design principles and modern design tools.",
      type: "Workshop",
      date: "Mar 5, 2024",
      duration: "4 Hours",
      level: "Beginner",
      price: "$39.99",
      originalPrice: "$59.99",
      attendees: 1200,
      rating: 4.6,
      reviews: 743,
      category: "WORKSHOP",
      status: "LIVE",
      cardTitle: "Design Beautiful Interfaces",
      cardDescription: "Learn to create intuitive and engaging user experiences with modern design tools.",
      features: [
        { icon: "🎨", text: "Creative" },
        { icon: "📐", text: "Prototyping" },
        { icon: "👥", text: "User Research" },
        { icon: "🛠️", text: "Tools" }
      ],
      isTrending: true,
      isNew: true,
      tags: ["UX Design", "UI Design", "Figma", "Prototyping"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "Virtual",
      speaker: "Alex Thompson",
      speakerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 5,
      title: "Blockchain & Web3",
      highlightedText: "Summit",
      description: "Explore the future of decentralized technology with industry leaders and blockchain pioneers.",
      type: "Conference",
      date: "Apr 18, 2024",
      duration: "3 Days",
      level: "Intermediate",
      price: "$399.99",
      originalPrice: "$499.99",
      attendees: 2800,
      rating: 4.8,
      reviews: 934,
      category: "SUMMIT",
      status: "COMING SOON",
      cardTitle: "Master Blockchain Technology",
      cardDescription: "Comprehensive insights into Web3, DeFi, NFTs and the future of decentralized internet.",
      features: [
        { icon: "⛓️", text: "Blockchain" },
        { icon: "💎", text: "NFT" },
        { icon: "🪙", text: "DeFi" },
        { icon: "🔗", text: "Web3" }
      ],
      isTrending: true,
      isNew: false,
      tags: ["Blockchain", "Web3", "NFT", "DeFi"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "Miami, FL",
      speaker: "James Wilson",
      speakerImage: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 6,
      title: "Content Marketing",
      highlightedText: "Masterclass",
      description: "Learn content strategy, SEO optimization, and storytelling techniques from top content marketers.",
      type: "Masterclass",
      date: "May 12, 2024",
      duration: "6 Hours",
      level: "Intermediate",
      price: "$79.99",
      originalPrice: "$99.99",
      attendees: 1900,
      rating: 4.5,
      reviews: 678,
      category: "MASTERCLASS",
      status: "EARLY BIRD",
      cardTitle: "Create Compelling Content",
      cardDescription: "Master the art of content creation and distribution across multiple platforms.",
      features: [
        { icon: "✍️", text: "Writing" },
        { icon: "🔍", text: "SEO" },
        { icon: "📈", text: "Analytics" },
        { icon: "🎥", text: "Video" }
      ],
      isTrending: false,
      isNew: true,
      tags: ["Content Marketing", "SEO", "Storytelling", "Blogging"],
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "Virtual",
      speaker: "Lisa Park",
      speakerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const countdown = {
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter events based on filters
  useEffect(() => {
    let filtered = [...allEventsData];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(event => {
      const price = parseFloat(event.price.replace('$', ''));
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Level filter
    if (filters.level !== 'all') {
      filtered = filtered.filter(event => 
        event.level.toLowerCase() === filters.level.toLowerCase()
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(event => 
        event.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    setFilteredEvents(filtered);
  }, [filters]);

  const handleRegister = (event) => {
    console.log("Registering for:", event.title);
    alert(`Registering for: ${event.title}`);
  };

  const shareEvent = (event) => {
    console.log("Sharing event:", event.title);
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      alert(`Share this event: ${event.title}`);
    }
  };

  const handleEventClick = (eventId) => {
    const index = allEventsData.findIndex(event => event.id === eventId);
    if (index !== -1) {
      setCurrentEventIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <EventSkeleton />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* All Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("events.page.title")} <span className="text-blue-600">{t("events.page.highlighted")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("events.page.description")}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <EventFilters
                filters={filters}
                onFiltersChange={setFilters}
                eventCount={filteredEvents.length}
              />
            </div>

            {/* Events Grid */}
            <div className="lg:w-3/4">
              <EventListing
                events={filteredEvents}
                onEventClick={handleEventClick}
                onRegister={handleRegister}
                currentFeaturedId={allEventsData[currentEventIndex]?.id}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("events.page.cta.title")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("events.page.cta.description")}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
            {t("events.page.cta.button")}
          </button>
        </div>
      </section>
    </section>
  );
};

export default EventsPage;