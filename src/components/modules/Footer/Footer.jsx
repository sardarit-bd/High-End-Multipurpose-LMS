const Footer = () => {
  return (
    <footer className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-secondary)]"># ASIA-LMS</h2>
            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
              Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary)]">Support</h3>
            <ul className="space-y-2 text-[var(--color-text)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Enroll Course</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Orders</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Payments</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary)]">About</h3>
            <ul className="space-y-2 text-[var(--color-text)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Fax</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Contacts</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary)]">Useful Links</h3>
            <ul className="space-y-2 text-[var(--color-text)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Our values</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Our advisory board</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Our partners</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Become a partner</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Work at Future Learn</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-secondary)]">Subscribe Newsletter</h3>
            <p className="text-[var(--color-text)] text-sm">
              Sign up to get updates & news.
            </p>
            <div className="flex flex-col">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 px-4 py-2 bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button className="my-4 px-6 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-lg font-medium transition-colors text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--color-primary)] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[var(--color-text)]/70 text-sm">
              Copyright 2023 © DreamsLife. All rights reserved.
            </div>
            <div className="flex space-x-6 text-[var(--color-text)]/70 text-sm">
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
