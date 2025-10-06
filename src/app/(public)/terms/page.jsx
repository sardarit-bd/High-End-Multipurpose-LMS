export default function TermsAndConditions() {
  return (
    <div className="bg-white min-h-screen py-12 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-[var(--color-background)] rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] p-8 lg:p-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="lg:text-4xl text-2xl font-bold text-[var(--color-secondary)] mb-4">
            Terms & Conditions
          </h1>
          <p className="text-[var(--color-text)] text-sm max-w-2xl mx-auto">
            Please read these Terms and Conditions carefully before using our platform. 
            By accessing or using our services, you agree to be bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-[var(--color-text)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using this platform, you accept and agree to be bound by the terms and provisions of this agreement. 
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              2. Use of Services
            </h2>
            <p className="leading-relaxed">
              You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others or restrict 
              their use and enjoyment of the services. Prohibited behavior includes harassing, causing distress, or transmitting obscene or offensive content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              3. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content, features, and functionality on this platform, including text, graphics, logos, and software, 
              are the property of our company and are protected by international copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              4. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              We are not liable for any damages that may occur as a result of using our services. 
              Your use of the platform is at your own risk and responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              5. Changes to Terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to update or modify these Terms & Conditions at any time without prior notice. 
              Changes will be effective immediately upon posting on the website. 
              Your continued use of the platform constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              6. Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us at: 
              <span className="text-[var(--color-secondary)] font-medium"> support@example.com</span>.
            </p>
          </section>
        </div>

        {/* Button */}
        {/* <div className="mt-10 text-center">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-8 py-3 rounded-[var(--radius-default)] shadow-[var(--shadow-soft)] transition">
            Accept & Continue
          </button>
        </div> */}
      </div>
    </div>
  );
}
