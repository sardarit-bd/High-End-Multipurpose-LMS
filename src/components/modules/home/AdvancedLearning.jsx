"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AdvancedLearning() {
  const { t } = useTranslation();

  return (
    <section className="text-white bg-black py-16 px-6 md:px-12 lg:px-24">
      <div className="container px-4 mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text Section */}
        <div>
          <p className="text-sm font-semibold mb-2 tracking-wide">
            {t("advancedLearning.subtitle") || "Advanced Learning"}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            {t("advancedLearning.title") || "Creating a community of learners."}
          </h2>

          <p className=" mb-8 leading-relaxed">
            {t("advancedLearning.description") || "We're dedicated to transforming education by providing a diverse range of high-quality courses that cater to learners of all levels."}
          </p>

          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <div className="bg-[var(--primary)] text-white p-3 rounded-lg text-lg">
                🌍
              </div>
              <div>
                <h4 className="font-semibold text-lg">
                  {t("advancedLearning.features.learnAnywhere.title") || "Learn from Anywhere"}
                </h4>
                <p className="text-sm">
                  {t("advancedLearning.features.learnAnywhere.description") || "Study from anywhere in the world, anytime that suits you best."}
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="bg-[var(--secondary)] text-white p-3 rounded-lg text-lg">
                🎓
              </div>
              <div>
                <h4 className="font-semibold text-lg">
                  {t("advancedLearning.features.expertMentors.title") || "Expert Mentors"}
                </h4>
                <p className="text-sm">
                  {t("advancedLearning.features.expertMentors.description") || "Learn directly from industry experts and educators."}
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="bg-[var(--accent)] text-white p-3 rounded-lg text-lg">
                💼
              </div>
              <div>
                <h4 className="font-semibold text-lg">
                  {t("advancedLearning.features.inDemandSkills.title") || "Learn In-Demand Skills"}
                </h4>
                <p className="text-sm">
                  {t("advancedLearning.features.inDemandSkills.description") || "Master the latest skills and tools required in modern careers."}
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] cursor-pointer text-white px-6 py-3 rounded-lg font-semibold shadow transition-all duration-300">
              {t("advancedLearning.enrollButton") || "Enroll as Student"}
            </button>
            <button className="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] cursor-pointer hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              {t("advancedLearning.applyTutorButton") || "Apply as Tutor"}
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex flex-col items-center md:items-end gap-6">
          <div className="relative w-72 md:w-80">
            <Image
              src="/images/student-1.jpg"
              alt={t("advancedLearning.imageAlt") || "Smiling student with notebook"}
              width={320}
              height={400}
              className="rounded-2xl shadow-lg object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}