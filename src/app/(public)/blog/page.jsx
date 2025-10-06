"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser, FaCalendarAlt, FaSearch } from "react-icons/fa";

const posts = [
    {
        id: 1,
        category: "Education",
        title: "Learn Web App Development from Experts in 2024",
        excerpt: "Master the art of web application development with expert guidance...",
        author: "John Miller",
        date: "23 Apr 2024",
        image: "/images/blog-1.jpg",
    },
    {
        id: 2,
        category: "Guides",
        title: "Expand Your Career Opportunities With Python",
        excerpt: "Unlock limitless career opportunities by mastering Python...",
        author: "Cedric Glenn",
        date: "20 Apr 2024",
        image: "/images/blog-2.jpg",
    },
    {
        id: 3,
        category: "Technical",
        title: "Learn Mobile Applications Development from Experts",
        excerpt: "Elevate your skills with expert-led training in mobile apps...",
        author: "John Reyes",
        date: "04 Apr 2024",
        image: "/images/blog-3.jpg",
    },
    {
        id: 4,
        category: "Guides",
        title: "Complete PHP Programming Career Roadmap",
        excerpt: "Step-by-step guide to learning PHP and building real-world apps...",
        author: "Alex Kim",
        date: "15 Apr 2024",
        image: "/images/blog-4.jpg",
    },
    {
        id: 5,
        category: "Education",
        title: "The Complete JavaScript Course for Beginners",
        excerpt: "Learn JavaScript fundamentals and build your first web applications...",
        author: "Sarah Lee",
        date: "10 Apr 2024",
        image: "/images/blog-5.jpg",
    },
    {
        id: 6,
        category: "Guides",
        title: "Programming Content Guidelines for 2024",
        excerpt: "Stay ahead with modern programming guidelines and coding standards...",
        author: "Mark Diaz",
        date: "05 Apr 2024",
        image: "/images/blog-6.jpg",
    },
];

export default function BlogPage() {
    const [search, setSearch] = useState("");

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
            post.author.toLowerCase().includes(search.toLowerCase()) ||
            post.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="py-16 bg-white text-[var(--color-text)]">
            <div className="container mx-auto px-4">
                {/* 🔎 Search Bar */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)] bg-white shadow-sm"
                        />
                        <FaSearch className="absolute left-4 top-3.5 text-[var(--color-primary)]" />
                    </div>
                </div>

                {/* 📚 Blog Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    {/* Category Badge */}
                                    <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-[var(--color-primary)] text-white">
                                        {post.category}
                                    </span>

                                    <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                                        <Link href='/blog/slug'>{post.title}</Link>
                                    </h3>
                                    <p className="text-sm text-[var(--color-text)]/70 mb-4">
                                        {post.excerpt}
                                    </p>

                                    {/* Author + Date */}
                                    <div className="flex items-center justify-between text-sm text-[var(--color-text)]/80">
                                        <span className="flex items-center gap-2">
                                            <FaUser className="text-[var(--color-accent)]" />
                                            {post.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-[var(--color-secondary)]" />
                                            {post.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-lg text-[var(--color-text)]/70">
                            No articles found matching your search.
                        </p>
                    )}
                </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10">
                <button className="px-2 text-sm lg:px-4 lg:text-lg py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition">
                    Prev
                </button>

                <button className="px-2 text-sm lg:px-4 lg:text-lg py-2 rounded-lg bg-[var(--color-primary)] text-white shadow-md">
                    1
                </button>
                <button className="px-2 text-sm lg:px-4 lg:text-lg py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition">
                    2
                </button>
                <button className="px-2 text-sm lg:px-4 lg:text-lg py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition">
                    3
                </button>

                <span className="px-3 text-[var(--color-text)]/60">...</span>

                <button className="px-2 text-sm lg:px-4 lg:text-lg py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition">
                    10
                </button>

                <button className="px-2 text-sm lg:px-4 lg:text-lg py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition">
                    Next
                </button>
            </div>

        </section>
    );
}
