"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Is there a 14-days trial?",
    answer:
      "No, we currently do not offer a 14-day trial. However, you can explore our platform through free demo courses or contact our team for a personalized walkthrough of the features.",
  },
  {
    question: "How much time I will need to learn this app?",
    answer:
      "Most users find they can get comfortable with the platform in just a few hours. We also provide tutorials and resources to help you get started quickly.",
  },
  {
    question: "Is there a month-to-month payment option?",
    answer:
      "Yes, we provide flexible month-to-month subscription plans along with yearly discounts.",
  },
  {
    question: "What’s the benefits of the Premium Membership?",
    answer:
      "Premium Membership gives you full access to all features, priority support, certifications, and more advanced tools.",
  },
  {
    question: "Are there any free tutorials available?",
    answer:
      "Yes! We provide free tutorials and demo courses to help you understand our platform better before subscribing.",
  },
  {
    question: "How can I cancel my subscription plan?",
    answer:
      "You can cancel your subscription anytime from your account settings, and you’ll still have access until the end of the billing period.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white text-[var(--color-text)]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Most frequently asked questions
          </h2>
          <p className="text-[var(--color-text)]/80">
            Here are the most frequently asked questions you may check before getting started
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-baseline">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-sm transition-colors duration-300 cursor-pointer ${
                openIndex === index
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`text-base font-semibold ${
                    openIndex === index
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)]"
                  }`}
                >
                  {faq.question}
                </h3>
                <span>
                  {openIndex === index ? (
                    <FiMinus className="text-[var(--color-primary)] text-lg" />
                  ) : (
                    <FiPlus className="text-[var(--color-text)] text-lg" />
                  )}
                </span>
              </div>

              {/* Smooth Collapse */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-[var(--color-text)]/80">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Box */}
        <div className="mt-16 p-8 bg-[var(--color-background)] border border-gray-200 rounded-lg text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Still have a question?</h3>
          <p className="text-[var(--color-text)]/70 mb-6">
            We'd be happy to help you with any questions you have! Please let us know what
            you're looking for, and we'll do our best to assist you.
          </p>
          <button className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold shadow-md hover:bg-[var(--color-primary-hover)] transition">
            <Link href='/contact'>Contact us</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
