export default function OurBenefits() {
  const benefits = [
    {
      title: "Flexible Learning",
      desc: "We believe that high-quality education should be accessible to everyone. Our pricing form in models are designed.",
      icon: "📘",
      gradient: "from-indigo-100 via-purple-50 to-pink-50",
    },
    {
      title: "Lifetime Access",
      desc: "When you enroll in our courses, you’re not just signing up for a temporary learning to experience you’re making.",
      icon: "📕",
      gradient: "from-pink-100 via-rose-50 to-red-50",
    },
    {
      title: "Expert Instruction",
      desc: "Our instructors are seasoned professionals with years of experience in their respective fields & Experts advice.",
      icon: "🎓",
      gradient: "from-blue-100 via-cyan-50 to-teal-50",
    },
  ];

  return (
    <section className="w-full bg-white z-100 py-16">
      <div className="container mx-auto text-center px-4">
        <h3 className="text-sm font-semibold text-[var(--color-secondary)] mb-2">
          Our Benefits
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          Master the Skills to Drive your Career
        </h2>
        <p className="text-gray-600 mb-10">
          The right course, guided by an expert mentor, can provide invaluable insights, practical skills.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-[var(--radius-card)] shadow-md bg-gradient-to-br ${item.gradient} p-6 flex flex-col items-start justify-center transition-all hover:shadow-lg hover:scale-[1.02] duration-300`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-left text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
