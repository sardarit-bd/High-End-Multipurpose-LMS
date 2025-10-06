"use client";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="bg-white pt-[80px] lg:pt-[120px]">
      <div className="container mx-auto px-4 space-y-10">

        {/* === Top Contact Info Boxes === */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 flex items-start gap-4">
            <div className="bg-[var(--color-secondary)] text-white p-3 rounded-full">
              <FaMapMarkerAlt size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Address</h3>
              <p className="text-gray-600">1364 Still Water Dr, AK 99801.</p>
            </div>
          </div>

          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 flex items-start gap-4">
            <div className="bg-[var(--color-primary)] text-white p-3 rounded-full">
              <FaPhoneAlt size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Phone</h3>
              <p className="text-gray-600">+1 (907) 789-7623</p>
            </div>
          </div>

          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 flex items-start gap-4">
            <div className="bg-[var(--color-accent)] text-[var(--color-text)] p-3 rounded-full">
              <FaEnvelope size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">Email</h3>
              <p className="text-gray-600">contact@example.com</p>
            </div>
          </div>
        </div>

        {/* === Contact Section (Text + Form) === */}
        <div className="relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] mb-12">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/background.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Gradient Overlay (Emerald → Blue with slight opacity) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/80 via-black/40 to-[var(--color-secondary)]/80"></div>

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-12 grid lg:grid-cols-2 gap-10">
            {/* Left Text */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-[var(--color-accent)] mb-2">Contact Us</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Get in touch with us today
              </h2>
              <p className="text-gray-200 text-base leading-relaxed">
                Get in touch with us to explore how our LMS solution can enhance your e-learning
                experience. We’re here to help you build a seamless and engaging learning platform!
              </p>
            </div>

            {/* Right Form */}
            <form className="bg-white/90 backdrop-blur-md rounded-[var(--radius-card)] p-6 space-y-4 shadow-[var(--shadow-soft)]">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 rounded-[var(--radius-default)] transition"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* === Map === */}
      <div className="overflow-hidden relative Z-10 shadow-[var(--shadow-medium)]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.720148594872!2d-74.0060156845938!3d40.712775279330084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316a4e5b6f%3A0xa9f66f83f8f9d28b!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1678901234567"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
