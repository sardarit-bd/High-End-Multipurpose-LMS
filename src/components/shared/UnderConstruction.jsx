"use client";

import Image from "next/image";
import Link from "next/link";

export default function UnderConstruction() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white text-[var(--color-text)] px-6">
      <div className="max-w-3xl w-full text-center">
        {/* Illustration */}
        <div className="relative w-full h-80 mb-8">
          <Image
            src="/images/under-construction.svg"
            alt="Website Under Construction"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          This Page is Under{" "}
          <span className="text-[var(--color-primary)]">Construction</span>
        </h1>

        {/* Subtext */}
        <p className="text-[var(--color-text)]/80 text-lg mb-8">
          We are working on fixing the problem. We’ll be back soon with an
          improved experience!
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-full shadow-[var(--shadow-medium)] hover:bg-[var(--color-primary-hover)] transition"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
