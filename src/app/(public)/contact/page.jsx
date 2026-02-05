"use client";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Your message has been sent successfully!"
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again."
      });
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <p className="text-gray-600">contact@sardarit.com</p>
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
                experience. We're here to help you build a seamless and engaging learning platform!
              </p>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md rounded-[var(--radius-card)] p-6 space-y-4 shadow-[var(--shadow-soft)]">
              {/* Status Message */}
              {submitStatus.message && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === "success" 
                    ? "bg-green-100 text-green-800 border border-green-200" 
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  required
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 rounded-[var(--radius-default)] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* === Map === */}
      <div className="overflow-hidden relative z-10 mb-12">
        <iframe
          className="container mx-auto p-4 rounded-b-[var(--radius-card)] shadow-[var(--shadow-medium)]"
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