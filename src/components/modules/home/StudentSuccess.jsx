export default function StudentSuccess() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="container px-0 mx-auto relative">
        {/* Image Card */}
        <div className="relative rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-medium)]">
          <img
            src="/images/students-group.jpg"
            alt="Happy Students"
            className="w-full h-[300px] md:h-[400px] object-cover"
          />

          {/* Stats Box */}
          <div className="absolute left-0 right-0 -bottom-20 mx-auto w-[90%] md:w-[85%] bg-[var(--color-secondary)] text-white rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 mb-6 text-left">
              <div>
                <h3 className="font-bold text-lg md:text-xl">Trusted by 15,000+ Students</h3>
                <p className="text-sm opacity-90">Since 2000</p>
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl">9.8/10 Course Approval</h3>
                <p className="text-sm opacity-90">
                  Achieving a complete course approval score is significant.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl">13k+ Satisfied Learners</h3>
                <p className="text-sm opacity-90">
                  Students worldwide share a common thread of happiness.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 py-2 rounded-full bg-[var(--color-accent)] text-[var(--color-text)] font-semibold hover:bg-[var(--color-accent-hover)] transition">
                Enroll as Student
              </button>
              <button className="px-6 py-2 rounded-full bg-white text-[var(--color-secondary)] font-semibold hover:bg-gray-100 transition">
                Apply as Tutor
              </button>
            </div>

            {/* Quote */}
            <div className="mt-6 text-sm italic bg-white/10 p-3 rounded-lg">
              “All courses are incredibly helpful to achieve your goals.”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
