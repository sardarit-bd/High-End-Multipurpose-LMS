"use client";
import { FaGlobe, FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="py-[var(--spacing-section)] bg-[var(--color-background)] min-h-[600px] flex items-center">
     <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
         {/* === Image Left === */}
      <div className="relative">
        {/* Decorative background shapes */}
        <div className="absolute -top-4 -left-4 w-3/4 h-3/4 bg-[var(--color-secondary)] rounded-[var(--radius-card)] -z-10"></div>
        <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-[var(--color-accent)] rounded-[var(--radius-card)] -z-10"></div>

        <Image
          src="/images/students-group.jpg"
          alt="About us"
          width={600}
          height={400}
          className="relative rounded-[var(--radius-card)] shadow-md"
        />
      </div>

      {/* === Content Right === */}
      <div>
        <p className="text-sm font-semibold text-[var(--color-accent)] mb-2">About</p>
        <h2 className="text-3xl font-bold text-[var(--color-text)] leading-snug mb-4">
          Empowering Learning, Inspiring Growth
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          At DreamLMS, we make education accessible to all with interactive courses and expert-led content. 
          Learn anytime, anywhere, and achieve your goals seamlessly.
        </p>

        {/* Features */}
        <div className="space-y-5">
          <div className="flex gap-4 items-start">
            <div className="bg-[var(--color-secondary)] text-white p-3 rounded-[var(--radius-default)] shadow-md">
              <FaGlobe size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Learn from anywhere</h3>
              <p className="text-sm text-gray-600">
                Learning from anywhere has become a transform aspect of modern education, allowing individuals.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-[var(--color-accent)] text-[var(--color-text)] p-3 rounded-[var(--radius-default)] shadow-md">
              <FaChalkboardTeacher size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Expert Mentors</h3>
              <p className="text-sm text-gray-600">
                Expert mentors are invaluable assets in any field, providing seasoned guidance and knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
     </div>
    </section>
  );
}
