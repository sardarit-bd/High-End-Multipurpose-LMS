"use client";

import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Step1Info from "@/components/modules/dashboard/instructorr/Step1Info";
import Step2Media from "@/components/modules/dashboard/instructorr/Step2Media";
import Step3Curriculum from "@/components/modules/dashboard/instructorr/Step3Curriculum";
import Step4Additional from "@/components/modules/dashboard/instructorr/Step4Additional";
import Step5Pricing from "@/components/modules/dashboard/instructorr/Step5Pricing";
import { useCourseStore } from "@/store/useCourseStore";

export default function AddCourseWizard() {
  const { step, setStep } = useCourseStore();
  const course = useCourseStore((s) => s.course);

  const stepTitles = [
    "Course Information",
    "Course Media",
    "Curriculum",
    "Additional information",
    "Pricing",
  ];

  const nextStep = () => setStep(Math.min(step + 1, 5));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  const handleSubmit = () => {    
    // submission logic here
    console.log("submit logic", course);
  }


  return (
    <div className="p-6 text-[var(--color-text)]">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-6">
        {stepTitles.map((title, i) => {
          const idx = i + 1;
          const completed = step > idx;
          const active = step === idx;
          return (
            <div key={title} className="flex-1 text-center">
              <div
                className={`mx-auto w-9 h-9 flex items-center justify-center rounded-full ${
                  completed || active
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300"
                }`}
              >
                {completed ? <CheckCircle size={18} /> : idx}
              </div>
              <p className="text-xs mt-2">{title}</p>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {step === 1 && <Step1Info />}
      {step === 2 && <Step2Media />}
      {step === 3 && <Step3Curriculum />}
      {step === 4 && <Step4Additional />}
      {step === 5 && <Step5Pricing />}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 1 ? (
          <button onClick={prevStep} className="flex items-center gap-2 px-4 py-2 border rounded">
            <ArrowLeft size={16} /> Prev
          </button>
        ) : (
          <div />
        )}
        {step < 5 ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
