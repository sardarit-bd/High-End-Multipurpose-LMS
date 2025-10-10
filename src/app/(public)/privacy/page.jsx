import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen py-12 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] p-8 lg:p-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="lg:text-4xl text-2xl font-bold text-[var(--color-secondary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[var(--color-text)] text-sm max-w-2xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, 
            and protect your information when you use our platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-[var(--color-text)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We may collect personal information such as your name, email address, phone number, 
              and payment details when you register, subscribe, or interact with our services. 
              We may also collect non-personal data like browser type, IP address, and usage statistics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed">
              The information we collect is used to provide, improve, and personalize our services, 
              process transactions, communicate with you, and ensure platform security. 
              We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              3. Cookies & Tracking Technologies
            </h2>
            <p className="leading-relaxed">
              Our platform may use cookies and similar technologies to enhance user experience, 
              analyze site traffic, and deliver personalized content. 
              You can disable cookies in your browser settings, but some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              4. Data Security
            </h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your information from 
              unauthorized access, alteration, or disclosure. However, no method of transmission 
              over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              5. Sharing of Information
            </h2>
            <p className="leading-relaxed">
              We may share your information with trusted third-party service providers who assist 
              in delivering our services. These providers are obligated to protect your data and 
              use it only for the purposes we specify.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              6. Your Rights
            </h2>
            <p className="leading-relaxed">
              You have the right to access, update, or delete your personal information. 
              You may also opt out of receiving promotional communications at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              7. Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. 
              Any changes will be posted on this page with an updated “last revised” date. 
              Continued use of our platform indicates acceptance of these changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
              8. Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, 
              please contact us at: 
              <span className="text-[var(--color-secondary)] font-medium"> privacy@example.com</span>.
            </p>
          </section>
        </div>

        {/* Button */}
        <div className="mt-10 text-center">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-8 py-3 rounded-[var(--radius-default)] shadow-[var(--shadow-soft)] transition">
           <Link href='/'>Back to Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
