"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <section className="bg-white pt-[80px] lg:pt-[120px]">
      <div className="container mx-auto px-4 space-y-10">

        {/* === Top Contact Info Boxes === */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Address */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 flex items-start gap-4">
            <div className="bg-[var(--color-secondary)] text-white p-3 rounded-full">
              <FaMapMarkerAlt size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">{t("contact.address")}</h3>
              <p className="text-gray-600">{t("contact.addressDetail")}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 flex items-start gap-4">
            <div className="bg-[var(--color-primary)] text-white p-3 rounded-full">
              <FaPhoneAlt size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">{t("contact.phone")}</h3>
              <p className="text-gray-600">{t("contact.phoneNumber")}</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] p-6 flex items-start gap-4">
            <div className="bg-[var(--color-accent)] text-[var(--color-text)] p-3 rounded-full">
              <FaEnvelope size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">{t("contact.email")}</h3>
              <p className="text-gray-600">{t("contact.emailAddress")}</p>
            </div>
          </div>
        </div>

        {/* === Contact Section (Text + Form) === */}
        <div className="relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] mb-12">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/background.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/80 via-black/40 to-[var(--color-secondary)]/80"></div>

          <div className="relative z-10 p-8 lg:p-12 grid lg:grid-cols-2 gap-10">
            {/* Left Text */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-[var(--color-accent)] mb-2">{t("contact.contactUs")}</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {t("contact.heading")}
              </h2>
              <p className="text-gray-200 text-base leading-relaxed">
                {t("contact.description")}
              </p>
            </div>

            {/* Right Form */}
            <form className="bg-white/90 backdrop-blur-md rounded-[var(--radius-card)] p-6 space-y-4 shadow-[var(--shadow-soft)]">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("contact.form.name")}
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
                <input
                  type="email"
                  placeholder={t("contact.form.email")}
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("contact.form.phone")}
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
                <input
                  type="text"
                  placeholder={t("contact.form.subject")}
                  className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <textarea
                placeholder={t("contact.form.message")}
                rows={4}
                className="w-full px-4 py-2 border bg-white/70 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 rounded-[var(--radius-default)] transition"
              >
                {t("contact.form.submit")}
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
