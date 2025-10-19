"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function LearningJourney() {
  const { t } = useTranslation();

  const steps = [
    {
      id: "01",
      title: t("learningJourney.steps.step1.title") || "Sign-Up or Register",
      desc: t("learningJourney.steps.step1.description") || "Once you're on the website's homepage, look for the Sign-Up, Register, or Create Account button.",
    },
    {
      id: "02",
      title: t("learningJourney.steps.step2.title") || "Complete Your Profile",
      desc: t("learningJourney.steps.step2.description") || "After verifying your email, you may be asked to complete additional profile information.",
    },
    {
      id: "03",
      title: t("learningJourney.steps.step3.title") || "Choose Courses or Programs",
      desc: t("learningJourney.steps.step3.description") || "Depending on the website, after registration, you might be able to browse and choose courses or programs to enroll in.",
    },
    {
      id: "04",
      title: t("learningJourney.steps.step4.title") || "Access Your Account",
      desc: t("learningJourney.steps.step4.description") || "Should have access to the website's features, such as enrolling in courses, materials, or tracking progress.",
    },
  ];

  return (
    <section className="bg-[var(--color-background)] py-16">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
        {/* Left Image */}
        <div className="flex justify-between">
          <div className="rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-medium)]">
            <Image
              src="/images/learning-journey.jpg"
              alt={t("learningJourney.imageAlt") || "Learning Journey"}
              width={500}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Right Text Content */}
        <div>
          <p className="text-[var(--color-accent)] font-semibold mb-2">
            {t("learningJourney.subtitle") || "How it Works"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
            {t("learningJourney.title") || "Start your Learning Journey Today!"}
          </h2>
          <p className="text-[var(--color-text)] mb-6 opacity-90">
            {t("learningJourney.description") || "Unlock Your Potential and Achieve Your Dreams with Our Comprehensive Learning Resources!"}
          </p>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="text-[var(--color-secondary)] text-2xl font-bold min-w-[40px]">
                  {step.id}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--color-text)]">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-text)] opacity-80">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}