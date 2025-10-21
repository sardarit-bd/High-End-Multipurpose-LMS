"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "home": "Home",
      "courses": "Courses",
      "pricing": "Pricing",
      "dashboard": "Dashboard",
      "leaderboard": "Leaderboard",
      "instructors": "Instructors",
      "games": "Games",
      "pages": "Pages",
      "sponsorship": "Sponsorship",
      "checkout": "Checkout",
      "event": "Event",
      "shop": "Shop",
      "about": "About Us",
      "contact": "Contact",
      "terms": "Terms and Conditions",
      "privacy": "Privacy Policy",
      "faq": "FAQ",
      "success": "Success History",
      "blog": "Blog",
      "donation": "Donation",
      "login": "Login",
      "register": "Register",
      "language": "Language",
      
      // Hero Section Translations
      "hero.leader": "The Leader in Online Learning",
      "hero.title1": "Find the",
      "hero.bestCourses": "Best Courses",
      "hero.title2": "from the",
      "hero.bestMentors": "Best Mentors",
      "hero.aroundWorld": "Around the World",
      "hero.description": "Our specialized online courses are designed to bring the classroom experience to you, no matter where you are.",
      "hero.stats.courses": "Online Courses",
      "hero.stats.certified": "Certified Courses",
      "hero.stats.tutors": "Experienced Tutors",

      // Categories Section Translations
      "categories.subtitle": "Our Categories",
      "categories.title": "Top Courses & Categories",
      "categories.description": "The right course, guided by an expert mentor, can provide invaluable insights, practical skills.",
      "categories.viewAll": "View All Categories",
      "categories.ariaLabel": "Top categories",
      "categories.previous": "Previous",
      "categories.next": "Next",
      
      // Individual Categories
      "categories.frontend": "Frontend Developer",
      "categories.jira": "Jira Management",
      "categories.figma": "Figma Developer",
      "categories.webflow": "Webflow Developer",
      "categories.framer": "Framer Developer",
      "categories.vue": "Vue js Developer",
      "categories.shopify": "Shopify Developer",

       // Courses Section Translations
      "courses.featuredSubtitle": "Featured Courses",
      "courses.title": "What's New in AsiaLMS",
      "courses.description": "Discover our featured courses, specially curated to help you gain in-demand skills.",
      "courses.filterBy": "Filter By:",
      "courses.viewMore": "View More",
      
      // Course Categories
      "courses.categories.all": "All",
      "courses.categories.uiux": "UI/UX",
      "courses.categories.productivity": "Productivity",
      "courses.categories.management": "Management",
      "courses.categories.artMedia": "Art & Media",

       // Course Card Translations
      "courses.lessons": "Lessons",
      "courses.free": "Free",
      "courses.exploreCourse": "Explore Course",
      
      // Course Categories (already exists, just ensuring they're there)
      "courses.categories.all": "All",
      "courses.categories.uiux": "UI/UX",
      "courses.categories.productivity": "Productivity",
      "courses.categories.management": "Management",
      "courses.categories.artMedia": "Art & Media",

      // Courses Titles - English
      "courses.uiux.course1.title": "Information About UI/UX Design Degree",
      "courses.uiux.course2.title": "UI/UX Wireframing and Prototyping",
      "courses.uiux.course3.title": "Mastering UX Research",
      "courses.uiux.course4.title": "Figma for Beginners",
      "courses.uiux.course5.title": "UX Writing Essentials",
      "courses.uiux.course6.title": "Advanced UI Animations",

      "courses.productivity.course1.title": "Learn & Create ReactJS Tech Fundamentals Apps",
      "courses.productivity.course2.title": "Boost Productivity with Notion",
      "courses.productivity.course3.title": "AI Tools for Work Efficiency",
      "courses.productivity.course4.title": "Time Management Strategies",
      "courses.productivity.course5.title": "Kanban for Teams",
      "courses.productivity.course6.title": "Deep Work Mastery",

      "courses.management.course1.title": "The Complete Business and Management Course",
      "courses.management.course2.title": "Project Management Essentials",
      "courses.management.course3.title": "Agile Leadership Training",
      "courses.management.course4.title": "Entrepreneurship 101",
      "courses.management.course5.title": "Financial Management Basics",
      "courses.management.course6.title": "Team Building Strategies",

      "courses.artMedia.course1.title": "Build Creative Arts & Media Course Completed",
      "courses.artMedia.course2.title": "Photography Masterclass",
      "courses.artMedia.course3.title": "Video Editing in Premiere Pro",
      "courses.artMedia.course4.title": "Digital Illustration in Procreate",
      "courses.artMedia.course5.title": "Storytelling for Filmmakers",
      "courses.artMedia.course6.title": "Sound Design Fundamentals",

      // Benefits Section Translations
      "benefits.subtitle": "Our Benefits",
      "benefits.title": "Master the Skills to Drive your Career",
      "benefits.description": "The right course, guided by an expert mentor, can provide invaluable insights, practical skills.",
      "benefits.flexibleLearning.title": "Flexible Learning",
      "benefits.flexibleLearning.desc": "We believe that high-quality education should be accessible to everyone. Our pricing form in models are designed.",
      "benefits.lifetimeAccess.title": "Lifetime Access",
      "benefits.lifetimeAccess.desc": "When you enroll in our courses, you're not just signing up for a temporary learning to experience you're making.",
      "benefits.expertInstruction.title": "Expert Instruction",
      "benefits.expertInstruction.desc": "Our instructors are seasoned professionals with years of experience in their respective fields & Experts advice.",

       // Pricing Section Translations
      "pricing.title": "Choose Your Membership",
      "pricing.description": "Select the plan that fits you best. Monthly or yearly options available.",
      "pricing.monthly": "Monthly",
      "pricing.yearly": "Yearly",
      "pricing.perMonth": "mo",
      "pricing.perYear": "yr",
      "pricing.selectButton": "Select",
      
      // Pricing Tiers
      "pricing.tiers.free.name": "Free",
      "pricing.tiers.free.tooltip": "Free tier with basic access",
      "pricing.tiers.free.benefits.0": "Access to limited courses",
      "pricing.tiers.free.benefits.1": "Community support",
      
      "pricing.tiers.premium.name": "Premium",
      "pricing.tiers.premium.tooltip": "Best for individual learners",
      "pricing.tiers.premium.benefits.0": "All courses access",
      "pricing.tiers.premium.benefits.1": "Certificate of completion",
      "pricing.tiers.premium.benefits.2": "Priority support",
      
      "pricing.tiers.institutional.name": "Institutional",
      "pricing.tiers.institutional.tooltip": "For schools, companies, or universities",
      "pricing.tiers.institutional.benefits.0": "Multiple users",
      "pricing.tiers.institutional.benefits.1": "Analytics dashboard",
      "pricing.tiers.institutional.benefits.2": "Dedicated support",

      // Partners Section Translations
      "partners.title": "Trusted by 20+ Institutions Around the World",


      // Advanced Learning Section Translations
      "advancedLearning.subtitle": "Advanced Learning",
      "advancedLearning.title": "Creating a community of learners.",
      "advancedLearning.description": "We're dedicated to transforming education by providing a diverse range of high-quality courses that cater to learners of all levels.",
      "advancedLearning.imageAlt": "Smiling student with notebook",
      "advancedLearning.enrollButton": "Enroll as Student",
      "advancedLearning.applyTutorButton": "Apply as Tutor",
      
      // Features
      "advancedLearning.features.learnAnywhere.title": "Learn from Anywhere",
      "advancedLearning.features.learnAnywhere.description": "Study from anywhere in the world, anytime that suits you best.",
      "advancedLearning.features.expertMentors.title": "Expert Mentors",
      "advancedLearning.features.expertMentors.description": "Learn directly from industry experts and educators.",
      "advancedLearning.features.inDemandSkills.title": "Learn In-Demand Skills",
      "advancedLearning.features.inDemandSkills.description": "Master the latest skills and tools required in modern careers.",

       // Learning Journey Section Translations
      "learningJourney.subtitle": "How it Works",
      "learningJourney.title": "Start your Learning Journey Today!",
      "learningJourney.description": "Unlock Your Potential and Achieve Your Dreams with Our Comprehensive Learning Resources!",
      "learningJourney.imageAlt": "Learning Journey",
      
      // Steps
      "learningJourney.steps.step1.title": "Sign-Up or Register",
      "learningJourney.steps.step1.description": "Once you're on the website's homepage, look for the Sign-Up, Register, or Create Account button.",
      
      "learningJourney.steps.step2.title": "Complete Your Profile",
      "learningJourney.steps.step2.description": "After verifying your email, you may be asked to complete additional profile information.",
      
      "learningJourney.steps.step3.title": "Choose Courses or Programs",
      "learningJourney.steps.step3.description": "Depending on the website, after registration, you might be able to browse and choose courses or programs to enroll in.",
      
      "learningJourney.steps.step4.title": "Access Your Account",
      "learningJourney.steps.step4.description": "Should have access to the website's features, such as enrolling in courses, materials, or tracking progress.",

      // Student Success Section Translations
      "studentSuccess.imageAlt": "Happy Students",
      "studentSuccess.enrollButton": "Enroll as Student",
      "studentSuccess.applyTutorButton": "Apply as Tutor",
      "studentSuccess.quote": "“All courses are incredibly helpful to achieve your goals.”",
      
      // Stats
      "studentSuccess.stats.trusted.title": "Trusted by 15,000+ Students",
      "studentSuccess.stats.trusted.subtitle": "Since 2000",
      "studentSuccess.stats.approval.title": "9.8/10 Course Approval",
      "studentSuccess.stats.approval.description": "Achieving a complete course approval score is significant.",
      "studentSuccess.stats.learners.title": "13k+ Satisfied Learners",
      "studentSuccess.stats.learners.description": "Students worldwide share a common thread of happiness.",

      // Footer Translations
      "footer.companyDescription": "Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.",
      "footer.copyright": "Copyright 2023 © DreamsLife. All rights reserved.",
      "footer.terms": "Terms & Conditions",
      "footer.privacy": "Privacy Policy",
      
      // Support Section
      "footer.support.title": "Support",
      "footer.support.education": "Education",
      "footer.support.enrollCourse": "Enroll Course",
      "footer.support.orders": "Orders",
      "footer.support.payments": "Payments",
      "footer.support.blogs": "Blogs",
      
      // About Section
      "footer.about.title": "About",
      "footer.about.categories": "Categories",
      "footer.about.courses": "Courses",
      "footer.about.aboutUs": "About Us",
      "footer.about.fax": "Fax",
      "footer.about.contacts": "Contacts",
      
      // Useful Links Section
      "footer.usefulLinks.title": "Useful Links",
      "footer.usefulLinks.ourValues": "Our values",
      "footer.usefulLinks.advisoryBoard": "Our advisory board",
      "footer.usefulLinks.partners": "Our partners",
      "footer.usefulLinks.becomePartner": "Become a partner",
      "footer.usefulLinks.workWithUs": "Work at Future Learn",
      
      // Newsletter Section
      "footer.newsletter.title": "Subscribe Newsletter",
      "footer.newsletter.description": "Sign up to get updates & news.",
      "footer.newsletter.placeholder": "Email Address",
      "footer.newsletter.button": "Subscribe",

       // Course Listing Translations
      "courseListing.filters": "Filters",
      "courseListing.clear": "Clear",
      "courseListing.close": "Close",
      "courseListing.categories": "Categories",
      "courseListing.instructors": "Instructors",
      "courseListing.price": "Price",
      "courseListing.searchPlaceholder": "Search",
      "courseListing.showingResults": "Showing {{showing}} of {{total}} results",
      
      // Additional Categories
      "courseListing.categories.programming": "Programming",
      "courseListing.categories.technology": "Technology",
      
      // Price Options
      "courseListing.priceOptions.all": "All",
      "courseListing.priceOptions.free": "Free",
      "courseListing.priceOptions.paid": "Paid",

      // Pricing Comparison Translations
      "pricingComparison.title": "Compare Our Plans",
      "pricingComparison.description": "Find the plan that suits your needs. Compare features across Basic, Team, and Pro tiers.",
      "pricingComparison.featuresHeader": "Features",
      
      // Plans
      "pricingComparison.plans.free": "Free",
      "pricingComparison.plans.premium": "Premium",
      "pricingComparison.plans.institutional": "Institutional",
      
      // Features
      "pricingComparison.features.separateBusiness": "Separate business/personal",
      "pricingComparison.features.trackMileage": "Track deductible mileage",
      "pricingComparison.features.downloadBanking": "Download online banking",
      "pricingComparison.features.multiDevice": "Multi-device",
      "pricingComparison.features.createInvoices": "Create invoices & estimates",
      "pricingComparison.features.manageVAT": "Manage VAT",
      "pricingComparison.features.manageBills": "Manage bills & payments",
      "pricingComparison.features.multipleCurrencies": "Multiple currencies",
      "pricingComparison.features.createBudgets": "Create budgets",
      "pricingComparison.features.trackTime": "Track time",

       // Instructor Listing Translations
      "instructorListing.filters": "Filters",
      "instructorListing.clear": "Clear",
      "instructorListing.close": "Close",
      "instructorListing.categories": "Categories",
      "instructorListing.searchPlaceholder": "Search instructor",
      "instructorListing.showingResults": "Showing {{count}} results",
      
      // Categories
      "instructorListing.categories.technology": "Technology",
      "instructorListing.categories.programming": "Programming",
      "instructorListing.categories.management": "Management",
      "instructorListing.categories.productivity": "Productivity",
      "instructorListing.categories.finance": "Finance",

       // Instructor Listing Translations
      "instructorListing.filters": "Filters",
      "instructorListing.clear": "Clear",
      "instructorListing.close": "Close",
      "instructorListing.categories": "Categories",
      "instructorListing.searchPlaceholder": "Search instructor",
      "instructorListing.showingResults": "Showing {{count}} results",
      
      // Categories
      "instructorListing.categories.technology": "Technology",
      "instructorListing.categories.programming": "Programming",
      "instructorListing.categories.management": "Management",
      "instructorListing.categories.productivity": "Productivity",
      "instructorListing.categories.finance": "Finance",
      
      // Instructor Roles
      "instructors.roles.developer": "Developer",
      "instructors.roles.finance": "Finance",
      "instructors.roles.cloudEngineer": "Cloud Engineer",
      "instructors.roles.corporateTrainer": "Corporate Trainer",
      "instructors.roles.vocational": "Vocational",
      "instructors.roles.sportsCoach": "Sports Coach",
      "instructors.roles.technicalTrainer": "Technical Trainer",
      "instructors.roles.healthWellness": "Health & Wellness",
      
      // Additional Categories
      "instructors.categories.general": "General",

       // Checkout Translations
      "checkout.billingAddress": "Billing Address",
      "checkout.firstName": "First Name *",
      "checkout.lastName": "Last Name *",
      "checkout.phoneNumber": "Phone Number (Optional)",
      "checkout.addressLine1": "Address Line 1 *",
      "checkout.addressLine2": "Address Line 2 (Optional)",
      "checkout.country": "Country *",
      "checkout.state": "State *",
      "checkout.city": "City *",
      "checkout.saveInformation": "Save this information for next time",
      
      "checkout.paymentMethod": "Payment Method",
      "checkout.paymentMethods.card": "Card",
      "checkout.paymentMethods.paypal": "Paypal",
      "checkout.paymentMethods.stripe": "Stripe",
      
      "checkout.cardNumber": "Card Number *",
      "checkout.nameOnCard": "Name on Card *",
      "checkout.expiryDate": "Expiry Date *",
      "checkout.securityNumber": "Security Number *",
      
      "checkout.payButton": "Pay {{amount}}",
      
      "checkout.orderDetails": "Order Details",
      "checkout.courses.uiux": "UI/UX Design Degree",
      "checkout.courses.react": "React Fundamentals",
      
      "checkout.subTotal": "Sub Total",
      "checkout.tax": "Tax (VAT)",
      "checkout.total": "Total",

       // About Page Translations
      "about.stats.onlineCourses": "Online Courses",
      "about.stats.expertTutors": "Expert Tutors",
      "about.stats.certifiedCourses": "Certified Courses",
      "about.stats.onlineStudents": "Online Students",
      
      // Instructors Section
      "about.instructors.title": "Top Class & Professional Instructors",
      "about.instructors.subtitle": "Words from those who've experienced real growth.",
      "about.instructors.roles.designer": "Designer",
      "about.instructors.roles.developer": "Developer",
      "about.instructors.roles.architect": "Architect",
      "about.instructors.testimonials.brenda": "This mentor helped me understand concepts that I...",
      "about.instructors.testimonials.adrian": "I've learned so much from my mentor's personal e...",
      "about.instructors.testimonials.coztanza": "The advice was useful, but I wish my mentor had...",
      
      // FAQ Section
      "about.faqs.subtitle": "FAQs",
      "about.faqs.title": "Frequently Asked Questions",
      "about.faqs.description": "Explore detailed answers to the most common questions about our platform.",
      "about.faqs.imageAlt": "FAQ",
      "about.faqs.q1": "What's DreamLMS want to give you?",
      "about.faqs.a1": "DreamLMS aims to provide you with a comprehensive and intuitive learning platform that enhances your educational experience.",
      "about.faqs.q2": "Why choose us for your education?",
      "about.faqs.a2": "We offer certified tutors, high-quality courses, and lifetime access with global recognition.",
      "about.faqs.q3": "How we provide service for you?",
      "about.faqs.a3": "We provide 24/7 support, flexible learning paths, and personalized mentoring for all learners.",

       // About Hero Translations
      "aboutHero.subtitle": "About",
      "aboutHero.title": "Empowering Learning, Inspiring Growth",
      "aboutHero.description": "At DreamLMS, we make education accessible to all with interactive courses and expert-led content. Learn anytime, anywhere, and achieve your goals seamlessly.",
      "aboutHero.imageAlt": "About us",
      
      // Features
      "aboutHero.features.learnAnywhere.title": "Learn from anywhere",
      "aboutHero.features.learnAnywhere.description": "Learning from anywhere has become a transform aspect of modern education, allowing individuals.",
      
      "aboutHero.features.expertMentors.title": "Expert Mentors",
      "aboutHero.features.expertMentors.description": "Expert mentors are invaluable assets in any field, providing seasoned guidance and knowledge.",
      // Event Page Translations
      "event.hero.title": "Digital Marketing Masterclass 2024",
      "event.hero.location": "Online & In-person (Dhaka, Bangladesh)",
      "event.hero.duration": "3 hours",
      "event.hero.attendees": "1250",
      "event.hero.price": "Free",
      "event.hero.category": "Workshop",
      "event.hero.organizer": "Tech Academy BD",
      "event.hero.registerButton": "Register Now",
      "event.hero.shareButton": "Share Event",
      
      // Events Page Translations
      "events.page.title": "Explore All Events",
      "events.page.highlighted": "Events",
      "events.page.description": "Discover amazing events across various categories and levels. Find the perfect event to enhance your skills and network.",
      "events.page.cta.title": "Ready to Transform Your Skills?",
      "events.page.cta.description": "Join thousands of professionals who have already transformed their careers through our events.",
      "events.page.cta.button": "View All Upcoming Events",
      
      // Event Categories
      "events.categories.masterclass": "MASTERCLASS",
      "events.categories.bootcamp": "BOOTCAMP",
      "events.categories.conference": "CONFERENCE",
      "events.categories.workshop": "WORKSHOP",
      "events.categories.summit": "SUMMIT",
      
      // Event Status
      "events.status.live": "LIVE",
      "events.status.comingSoon": "COMING SOON",
      "events.status.earlyBird": "EARLY BIRD",
      
      // Event Features
      "events.features.practical": "Practical",
      "events.features.interactive": "Interactive",
      "events.features.networking": "Networking",
      "events.features.resources": "Resources",
      "events.features.handsOn": "Hands-on",
      "events.features.projectBased": "Project-based",
      "events.features.careerSupport": "Career Support",
      "events.features.mobileFirst": "Mobile First",
      "events.features.analytics": "Analytics",
      "events.features.aiMl": "AI/ML",
      "events.features.research": "Research",
      "events.features.global": "Global",
      "events.features.creative": "Creative",
      "events.features.prototyping": "Prototyping",
      "events.features.userResearch": "User Research",
      "events.features.tools": "Tools",
      "events.features.blockchain": "Blockchain",
      "events.features.nft": "NFT",
      "events.features.defi": "DeFi",
      "events.features.web3": "Web3",
      "events.features.writing": "Writing",
      "events.features.seo": "SEO",
      "events.features.video": "Video",
      
      // Event Types
      "events.types.workshop": "Workshop",
      "events.types.bootcamp": "Bootcamp",
      "events.types.conference": "Conference",
      "events.types.masterclass": "Masterclass",
      
      // Event Levels
      "events.levels.beginner": "Beginner",
      "events.levels.intermediate": "Intermediate",
      "events.levels.advanced": "Advanced",
      
      // Testimonials
      "events.testimonials.title": "What Attendees Say",
      "events.testimonials.subtitle": "Join thousands of satisfied participants",
      "events.testimonials.content": "This event transformed my approach to digital marketing. The speakers were incredible and the networking opportunities were absolutely priceless! I've already implemented strategies that boosted our ROI by 40%.",
      
      // Filter Labels
      "events.filters.category": "Category",
      "events.filters.priceRange": "Price Range",
      "events.filters.date": "Date",
      "events.filters.level": "Level",
      "events.filters.type": "Type",
      "events.filters.all": "All",
      "events.filters.eventCount": "{{count}} events found",
      
      // Buttons and Actions
      "events.actions.register": "Register",
      "events.actions.share": "Share",
      "events.actions.viewDetails": "View Details",
      "events.actions.bookmark": "Bookmark",
      "events.actions.like": "Like",

      // Event Filters Translations
      "events.filters.title": "Filters",
      "events.filters.category": "Category",
      "events.filters.priceRange": "Price Range",
      "events.filters.date": "Date",
      "events.filters.level": "Level",
      "events.filters.type": "Type",
      "events.filters.all": "All",
      "events.filters.eventCount": "{{count}} events",
      "events.filters.under50": "Under $50",
      "events.filters.fiftyTo200": "$50-200",
      "events.filters.clearAll": "Clear All Filters",

      // Shop Hero Translations
      "shop.hero.badge": "Knowledge Awaits",
      "shop.hero.title": "Discover Your Next",
      "shop.hero.highlighted": "Favorite Book",
      "shop.hero.description": "Explore our vast collection of books across all genres. From bestsellers to hidden gems, find the perfect read for every taste and interest.",
      "shop.hero.searchPlaceholder": "Search books, authors, or categories...",
      "shop.hero.stats.books": "Books",
      "shop.hero.stats.categories": "Categories",
      "shop.hero.stats.free": "Free",
      "shop.hero.stats.shipping": "Shipping",
      "shop.hero.stats.support": "Support",
      
      // Filter Sidebar Translations
      "shop.filters.title": "Filters",
      "shop.filters.showingResults": "Showing {{count}} products",
      "shop.filters.categories": "Categories",
      "shop.filters.allCategories": "All Categories",
      "shop.filters.electronics": "Electronics",
      "shop.filters.clothing": "Clothing",
      "shop.filters.accessories": "Accessories",
      "shop.filters.sports": "Sports",
      "shop.filters.homeGarden": "Home & Garden",
      "shop.filters.priceRange": "Price Range",
      "shop.filters.under50": "Under $50",
      "shop.filters.fiftyTo200": "$50-$200",
      "shop.filters.minimumRating": "Minimum Rating",
      "shop.filters.andUp": "& Up",
      "shop.filters.clearAll": "Clear All Filters",

      "shop.productsTitle": "All Products",
      "shop.noProducts.title": "No products found",
      "shop.noProducts.subtitle": "Try adjusting your filters to find more products.",
      "shop.sort.featured": "Featured",
      "shop.sort.lowToHigh": "Price: Low to High",
      "shop.sort.highToLow": "Price: High to Low",
      "shop.sort.rating": "Highest Rated",
      "shop.sort.nameAZ": "Name A-Z",
      
      "cart.title": "Shopping Cart",
      "cart.emptyTitle": "Your cart is empty",
      "cart.emptySubtitle": "Add some products to get started!",
      "cart.continueShopping": "Continue Shopping",
      "cart.remove": "Remove",
      "cart.subtotal": "Subtotal",
      "cart.shipping": "Shipping",
      "cart.free": "Free",
      "cart.total": "Total",
      "cart.checkout": "Proceed to Checkout",





    }
  },
  ms: {
    translation: {
      "home": "Laman Utama",
      "courses": "Kursus",
      "pricing": "Harga",
      "dashboard": "Papan Pemuka",
      "instructors": "Tenaga Pengajar",
      "games": "Permainan",
      "pages": "Halaman",
      "sponsorship": "Penajaan",
      "checkout": "Pembayaran",
      "event": "Acara",
      "shop": "Kedai",
      "about": "Tentang Kami",
      "contact": "Hubungi Kami",
      "terms": "Terma dan Syarat",
      "privacy": "Dasar Privasi",
      "faq": "Soalan Lazim",
      "success": "Sejarah Kejayaan",
      "blog": "Blog",
      "donation": "Derma",
      "login": "Log Masuk",
      "register": "Daftar",
      "language": "Bahasa",
      
      // Hero Section Malay Translations
      "hero.leader": "Peneraju dalam Pembelajaran Dalam Talian",
      "hero.title1": "Cari",
      "hero.bestCourses": "Kursus Terbaik",
      "hero.title2": "dari",
      "hero.bestMentors": "Mentor Terbaik",
      "hero.aroundWorld": "Di Seluruh Dunia",
      "hero.description": "Kursus dalam talian khusus kami direka untuk membawa pengalaman bilik darjah kepada anda, di mana sahaja anda berada.",
      "hero.stats.courses": "Kursus Dalam Talian",
      "hero.stats.certified": "Kursus Bertauliah",
      "hero.stats.tutors": "Tutor Berpengalaman",

      // Categories Section Malay Translations
      "categories.subtitle": "Kategori Kami",
      "categories.title": "Kursus & Kategori Teratas",
      "categories.description": "Kursus yang tepat, dibimbing oleh mentor pakar, dapat memberikan pandangan berharga, kemahiran praktikal.",
      "categories.viewAll": "Lihat Semua Kategori",
      "categories.ariaLabel": "Kategori teratas",
      "categories.previous": "Sebelumnya",
      "categories.next": "Seterusnya",
      
      // Individual Categories Malay
      "categories.frontend": "Pembangun Frontend",
      "categories.jira": "Pengurusan Jira",
      "categories.figma": "Pembangun Figma",
      "categories.webflow": "Pembangun Webflow",
      "categories.framer": "Pembangun Framer",
      "categories.vue": "Pembangun Vue js",
      "categories.shopify": "Pembangun Shopify",


      // Courses Section Malay Translations
      "courses.featuredSubtitle": "Kursus Terpilih",
      "courses.title": "Apa Yang Baru di AsiaLMS",
      "courses.description": "Temui kursus pilihan kami, yang dikurasi khas untuk membantu anda memperoleh kemahiran yang diperlukan.",
      "courses.filterBy": "Tapis Mengikut:",
      "courses.viewMore": "Lihat Lagi",
      
      // Course Categories Malay
      "courses.categories.all": "Semua",
      "courses.categories.uiux": "UI/UX",
      "courses.categories.productivity": "Produktiviti",
      "courses.categories.management": "Pengurusan",
      "courses.categories.artMedia": "Seni & Media",

      // Course Card Malay Translations
      "courses.lessons": "Pelajaran",
      "courses.free": "Percuma",
      "courses.exploreCourse": "Terokai Kursus",
      
      // Course Categories Malay (already exists, just ensuring they're there)
      "courses.categories.all": "Semua",
      "courses.categories.uiux": "UI/UX",
      "courses.categories.productivity": "Produktiviti",
      "courses.categories.management": "Pengurusan",
      "courses.categories.artMedia": "Seni & Media",

       // Courses Titles - Malay
      "courses.uiux.course1.title": "Maklumat Tentang Ijazah Reka Bentuk UI/UX",
      "courses.uiux.course2.title": "Pembuatan Rangka dan Prototaip UI/UX",
      "courses.uiux.course3.title": "Menguasai Penyelidikan UX",
      "courses.uiux.course4.title": "Figma untuk Pemula",
      "courses.uiux.course5.title": "Asas Penulisan UX",
      "courses.uiux.course6.title": "Animasi UI Lanjutan",

      "courses.productivity.course1.title": "Belajar & Cipta Aplikasi Asas Teknologi ReactJS",
      "courses.productivity.course2.title": "Tingkatkan Produktiviti dengan Notion",
      "courses.productivity.course3.title": "Alat AI untuk Kecekapan Kerja",
      "courses.productivity.course4.title": "Strategi Pengurusan Masa",
      "courses.productivity.course5.title": "Kanban untuk Pasukan",
      "courses.productivity.course6.title": "Penguasaan Kerja Mendalam",

      "courses.management.course1.title": "Kursus Perniagaan dan Pengurusan Lengkap",
      "courses.management.course2.title": "Asas Pengurusan Projek",
      "courses.management.course3.title": "Latihan Kepimpinan Agile",
      "courses.management.course4.title": "Keusahawanan 101",
      "courses.management.course5.title": "Asas Pengurusan Kewangan",
      "courses.management.course6.title": "Strategi Pembinaan Pasukan",

      "courses.artMedia.course1.title": "Bina Kursus Seni & Media Kreatif Selesai",
      "courses.artMedia.course2.title": "Kelas Master Fotografi",
      "courses.artMedia.course3.title": "Suntingan Video dalam Premiere Pro",
      "courses.artMedia.course4.title": "Ilustrasi Digital dalam Procreate",
      "courses.artMedia.course5.title": "Penceritaan untuk Pembuat Filem",
      "courses.artMedia.course6.title": "Asas Reka Bentuk Bunyi",

      // Benefits Section Malay Translations
      "benefits.subtitle": "Manfaat Kami",
      "benefits.title": "Kuasa Kemahiran untuk Memacu Kerjaya Anda",
      "benefits.description": "Kursus yang tepat, dibimbing oleh mentor pakar, dapat memberikan pandangan berharga, kemahiran praktikal.",
      "benefits.flexibleLearning.title": "Pembelajaran Fleksibel",
      "benefits.flexibleLearning.desc": "Kami percaya bahawa pendidikan berkualiti tinggi harus boleh diakses oleh semua orang. Model penetapan harga kami direka bentuk.",
      "benefits.lifetimeAccess.title": "Akses Sepanjang Hayat",
      "benefits.lifetimeAccess.desc": "Apabila anda mendaftar dalam kursus kami, anda bukan hanya mendaftar untuk pengalaman pembelajaran sementara, anda membuat.",
      "benefits.expertInstruction.title": "Arahan Pakar",
      "benefits.expertInstruction.desc": "Pengajar kami adalah profesional berpengalaman dengan pengalaman bertahun-tahun dalam bidang masing-masing & nasihat pakar.",

       // Pricing Section Malay Translations
      "pricing.title": "Pilih Keahlian Anda",
      "pricing.description": "Pilih rancangan yang paling sesuai dengan anda. Pilihan bulanan atau tahunan disediakan.",
      "pricing.monthly": "Bulanan",
      "pricing.yearly": "Tahunan",
      "pricing.perMonth": "bln",
      "pricing.perYear": "thn",
      "pricing.selectButton": "Pilih",
      
      // Pricing Tiers Malay
      "pricing.tiers.free.name": "Percuma",
      "pricing.tiers.free.tooltip": "Tingkat percuma dengan akses asas",
      "pricing.tiers.free.benefits.0": "Akses kepada kursus terhad",
      "pricing.tiers.free.benefits.1": "Sokongan komuniti",
      
      "pricing.tiers.premium.name": "Premium",
      "pricing.tiers.premium.tooltip": "Terbaik untuk pelajar individu",
      "pricing.tiers.premium.benefits.0": "Akses semua kursus",
      "pricing.tiers.premium.benefits.1": "Sijil penyiapan",
      "pricing.tiers.premium.benefits.2": "Sokongan keutamaan",
      
      "pricing.tiers.institutional.name": "Institusi",
      "pricing.tiers.institutional.tooltip": "Untuk sekolah, syarikat, atau universiti",
      "pricing.tiers.institutional.benefits.0": "Berbilang pengguna",
      "pricing.tiers.institutional.benefits.1": "Papan pemuka analitik",
      "pricing.tiers.institutional.benefits.2": "Sokongan berdedikasi",

      // Partners Section Malay Translations
      "partners.title": "Dipercayai oleh 20+ Institusi di Seluruh Dunia",

      // Advanced Learning Section Malay Translations
      "advancedLearning.subtitle": "Pembelajaran Lanjutan",
      "advancedLearning.title": "Mewujudkan komuniti pelajar.",
      "advancedLearning.description": "Kami komited untuk mengubah pendidikan dengan menyediakan pelbagai kursus berkualiti tinggi yang memenuhi keperluan pelajar semua peringkat.",
      "advancedLearning.imageAlt": "Pelajar tersenyum dengan buku nota",
      "advancedLearning.enrollButton": "Daftar sebagai Pelajar",
      "advancedLearning.applyTutorButton": "Mohon sebagai Tutor",
      
      // Features Malay
      "advancedLearning.features.learnAnywhere.title": "Belajar dari Mana Saja",
      "advancedLearning.features.learnAnywhere.description": "Belajar dari mana sahaja di dunia, pada bila-bila masa yang sesuai dengan anda.",
      "advancedLearning.features.expertMentors.title": "Mentor Pakar",
      "advancedLearning.features.expertMentors.description": "Belajar terus daripada pakar industri dan pendidik.",
      "advancedLearning.features.inDemandSkills.title": "Pelajari Kemahiran Permintaan Tinggi",
      "advancedLearning.features.inDemandSkills.description": "Kuasaikan kemahiran dan alat terkini yang diperlukan dalam kerjaya moden.",

      // Learning Journey Section Malay Translations
      "learningJourney.subtitle": "Bagaimana Ia Berfungsi",
      "learningJourney.title": "Mulakan Perjalanan Pembelajaran Anda Hari Ini!",
      "learningJourney.description": "Buka Potensi Anda dan Capai Impian Anda dengan Sumber Pembelajaran Komprehensif Kami!",
      "learningJourney.imageAlt": "Perjalanan Pembelajaran",
      
      // Steps Malay
      "learningJourney.steps.step1.title": "Daftar atau Daftar Masuk",
      "learningJourney.steps.step1.description": "Setelah anda berada di halaman utama laman web, cari butang Daftar, Daftar Masuk, atau Buat Akaun.",
      
      "learningJourney.steps.step2.title": "Lengkapkan Profil Anda",
      "learningJourney.steps.step2.description": "Selepas mengesahkan e-mel anda, anda mungkin diminta untuk melengkapkan maklumat profil tambahan.",
      
      "learningJourney.steps.step3.title": "Pilih Kursus atau Program",
      "learningJourney.steps.step3.description": "Bergantung pada laman web, selepas pendaftaran, anda mungkin boleh melayari dan memilih kursus atau program untuk mendaftar.",
      
      "learningJourney.steps.step4.title": "Akses Akaun Anda",
      "learningJourney.steps.step4.description": "Seharusnya mempunyai akses kepada ciri-ciri laman web, seperti mendaftar dalam kursus, bahan, atau menjejaki kemajuan.",


      // Student Success Section Malay Translations
      "studentSuccess.imageAlt": "Pelajar Gembira",
      "studentSuccess.enrollButton": "Daftar sebagai Pelajar",
      "studentSuccess.applyTutorButton": "Mohon sebagai Tutor",
      "studentSuccess.quote": "“Semua kursus sangat membantu untuk mencapai matlamat anda.”",
      
      // Stats Malay
      "studentSuccess.stats.trusted.title": "Dipercayai oleh 15,000+ Pelajar",
      "studentSuccess.stats.trusted.subtitle": "Sejak 2000",
      "studentSuccess.stats.approval.title": "9.8/10 Kelulusan Kursus",
      "studentSuccess.stats.approval.description": "Mencapai skor kelulusan kursus yang lengkap adalah signifikan.",
      "studentSuccess.stats.learners.title": "13k+ Pembelajaran Berpuas Hati",
      "studentSuccess.stats.learners.description": "Pelajar di seluruh dunia berkongsi benang kebahagiaan yang sama.",

       // Footer Malay Translations
      "footer.companyDescription": "Platform yang direka untuk membantu organisasi, pendidik, dan pelajar mengurus, menyampaikan, dan menjejaki aktiviti pembelajaran dan latihan.",
      "footer.copyright": "Hak Cipta 2023 © DreamsLife. Hak cipta terpelihara.",
      "footer.terms": "Terma & Syarat",
      "footer.privacy": "Dasar Privasi",
      
      // Support Section Malay
      "footer.support.title": "Sokongan",
      "footer.support.education": "Pendidikan",
      "footer.support.enrollCourse": "Daftar Kursus",
      "footer.support.orders": "Pesanan",
      "footer.support.payments": "Pembayaran",
      "footer.support.blogs": "Blog",
      
      // About Section Malay
      "footer.about.title": "Tentang",
      "footer.about.categories": "Kategori",
      "footer.about.courses": "Kursus",
      "footer.about.aboutUs": "Tentang Kami",
      "footer.about.fax": "Faks",
      "footer.about.contacts": "Hubungan",
      
      // Useful Links Section Malay
      "footer.usefulLinks.title": "Pautan Berguna",
      "footer.usefulLinks.ourValues": "Nilai kami",
      "footer.usefulLinks.advisoryBoard": "Lembaga penasihat kami",
      "footer.usefulLinks.partners": "Rakan kongsi kami",
      "footer.usefulLinks.becomePartner": "Menjadi rakan kongsi",
      "footer.usefulLinks.workWithUs": "Bekerja dengan Kami",
      
      // Newsletter Section Malay
      "footer.newsletter.title": "Langgan Buletin",
      "footer.newsletter.description": "Daftar untuk mendapatkan kemas kini & berita.",
      "footer.newsletter.placeholder": "Alamat E-mel",
      "footer.newsletter.button": "Langgan",

        // Course Listing Malay Translations
      "courseListing.filters": "Penapis",
      "courseListing.clear": "Kosongkan",
      "courseListing.close": "Tutup",
      "courseListing.categories": "Kategori",
      "courseListing.instructors": "Pengajar",
      "courseListing.price": "Harga",
      "courseListing.searchPlaceholder": "Cari",
      "courseListing.showingResults": "Menunjukkan {{showing}} daripada {{total}} hasil",
      
      // Additional Categories Malay
      "courseListing.categories.programming": "Pengaturcaraan",
      "courseListing.categories.technology": "Teknologi",
      
      // Price Options Malay
      "courseListing.priceOptions.all": "Semua",
      "courseListing.priceOptions.free": "Percuma",
      "courseListing.priceOptions.paid": "Berbayar",

      // Pricing Comparison Malay Translations
      "pricingComparison.title": "Bandingkan Pelan Kami",
      "pricingComparison.description": "Cari pelan yang sesuai dengan keperluan anda. Bandingkan ciri merentas tahap Asas, Pasukan, dan Pro.",
      "pricingComparison.featuresHeader": "Ciri-ciri",
      
      // Plans Malay
      "pricingComparison.plans.free": "Percuma",
      "pricingComparison.plans.premium": "Premium",
      "pricingComparison.plans.institutional": "Institusi",
      
      // Features Malay
      "pricingComparison.features.separateBusiness": "Asingkan perniagaan/peribadi",
      "pricingComparison.features.trackMileage": "Jejak jarak boleh ditolak",
      "pricingComparison.features.downloadBanking": "Muat turun perbankan dalam talian",
      "pricingComparison.features.multiDevice": "Berbilang peranti",
      "pricingComparison.features.createInvoices": "Buat invois & anggaran",
      "pricingComparison.features.manageVAT": "Urus VAT",
      "pricingComparison.features.manageBills": "Urus bil & pembayaran",
      "pricingComparison.features.multipleCurrencies": "Berbilang mata wang",
      "pricingComparison.features.createBudgets": "Buat belanjawan",
      "pricingComparison.features.trackTime": "Jejak masa",

      // Instructor Listing Malay Translations
      "instructorListing.filters": "Penapis",
      "instructorListing.clear": "Kosongkan",
      "instructorListing.close": "Tutup",
      "instructorListing.categories": "Kategori",
      "instructorListing.searchPlaceholder": "Cari pengajar",
      "instructorListing.showingResults": "Menunjukkan {{count}} hasil",
      
      // Categories Malay
      "instructorListing.categories.technology": "Teknologi",
      "instructorListing.categories.programming": "Pengaturcaraan",
      "instructorListing.categories.management": "Pengurusan",
      "instructorListing.categories.productivity": "Produktiviti",
      "instructorListing.categories.finance": "Kewangan",
      
      // Instructor Roles Malay
      "instructors.roles.developer": "Pembangun",
      "instructors.roles.finance": "Kewangan",
      "instructors.roles.cloudEngineer": "Jurutera Awan",
      "instructors.roles.corporateTrainer": "Jurulatih Korporat",
      "instructors.roles.vocational": "Vokasional",
      "instructors.roles.sportsCoach": "Jurulatih Sukan",
      "instructors.roles.technicalTrainer": "Jurulatih Teknikal",
      "instructors.roles.healthWellness": "Kesihatan & Kesejahteraan",
      
      // Additional Categories Malay
      "instructors.categories.general": "Umum",

      // Checkout Malay Translations
      "checkout.billingAddress": "Alamat Bil",
      "checkout.firstName": "Nama Pertama *",
      "checkout.lastName": "Nama Akhir *",
      "checkout.phoneNumber": "Nombor Telefon (Pilihan)",
      "checkout.addressLine1": "Baris Alamat 1 *",
      "checkout.addressLine2": "Baris Alamat 2 (Pilihan)",
      "checkout.country": "Negara *",
      "checkout.state": "Negeri *",
      "checkout.city": "Bandar *",
      "checkout.saveInformation": "Simpan maklumat ini untuk kali seterusnya",
      
      "checkout.paymentMethod": "Kaedah Pembayaran",
      "checkout.paymentMethods.card": "Kad",
      "checkout.paymentMethods.paypal": "Paypal",
      "checkout.paymentMethods.stripe": "Stripe",
      
      "checkout.cardNumber": "Nombor Kad *",
      "checkout.nameOnCard": "Nama pada Kad *",
      "checkout.expiryDate": "Tarikh Luput *",
      "checkout.securityNumber": "Nombor Keselamatan *",
      
      "checkout.payButton": "Bayar {{amount}}",
      
      "checkout.orderDetails": "Butiran Pesanan",
      "checkout.courses.uiux": "Ijazah Reka Bentuk UI/UX",
      "checkout.courses.react": "Asas React",
      
      "checkout.subTotal": "Jumlah kecil",
      "checkout.tax": "Cukai (VAT)",
      "checkout.total": "Jumlah",

      // About Page Malay Translations
      "about.stats.onlineCourses": "Kursus Dalam Talian",
      "about.stats.expertTutors": "Tutor Pakar",
      "about.stats.certifiedCourses": "Kursus Bertauliah",
      "about.stats.onlineStudents": "Pelajar Dalam Talian",
      
      // Instructors Section Malay
      "about.instructors.title": "Pengajar Kelas Atas & Profesional",
      "about.instructors.subtitle": "Kata-kata daripada mereka yang mengalami pertumbuhan sebenar.",
      "about.instructors.roles.designer": "Pereka",
      "about.instructors.roles.developer": "Pembangun",
      "about.instructors.roles.architect": "Arkitek",
      "about.instructors.testimonials.brenda": "Mentor ini membantu saya memahami konsep yang saya...",
      "about.instructors.testimonials.adrian": "Saya telah belajar banyak daripada pengalaman peribadi mentor saya...",
      "about.instructors.testimonials.coztanza": "Nasihat itu berguna, tetapi saya harap mentor saya...",
      
      // FAQ Section Malay
      "about.faqs.subtitle": "Soalan Lazim",
      "about.faqs.title": "Soalan Lazim",
      "about.faqs.description": "Terokai jawapan terperinci untuk soalan paling biasa mengenai platform kami.",
      "about.faqs.imageAlt": "Soalan Lazim",
      "about.faqs.q1": "Apa yang DreamLMS ingin berikan kepada anda?",
      "about.faqs.a1": "DreamLMS bertujuan untuk menyediakan anda platform pembelajaran yang komprehensif dan intuitif yang meningkatkan pengalaman pendidikan anda.",
      "about.faqs.q2": "Mengapa pilih kami untuk pendidikan anda?",
      "about.faqs.a2": "Kami menawarkan tutor bertauliah, kursus berkualiti tinggi, dan akses sepanjang hayat dengan pengiktirafan global.",
      "about.faqs.q3": "Bagaimana kami menyediakan perkhidmatan untuk anda?",
      "about.faqs.a3": "Kami menyediakan sokongan 24/7, laluan pembelajaran fleksibel, dan bimbingan diperibadikan untuk semua pelajar.", 

      // About Hero Malay Translations
      "aboutHero.subtitle": "Tentang",
      "aboutHero.title": "Memperkukuh Pembelajaran, Mendorong Pertumbuhan",
      "aboutHero.description": "Di DreamLMS, kami menjadikan pendidikan boleh diakses oleh semua dengan kursus interaktif dan kandungan dipimpin pakar. Belajar bila-bila masa, di mana sahaja, dan capai matlamat anda dengan lancar.",
      "aboutHero.imageAlt": "Tentang kami",
      
      // Features Malay
      "aboutHero.features.learnAnywhere.title": "Belajar dari mana sahaja",
      "aboutHero.features.learnAnywhere.description": "Pembelajaran dari mana sahaja telah menjadi aspek transformasi pendidikan moden, membolehkan individu.",
      
      "aboutHero.features.expertMentors.title": "Mentor Pakar",
      "aboutHero.features.expertMentors.description": "Mentor pakar adalah aset yang tidak ternilai dalam mana-mana bidang, memberikan bimbingan dan pengetahuan berpengalaman.",

      // Event Page Malay Translations
      "event.hero.title": "Kelas Induk Pemasaran Digital 2024",
      "event.hero.location": "Dalam Talian & Bersemuka (Dhaka, Bangladesh)",
      "event.hero.duration": "3 jam",
      "event.hero.attendees": "1250",
      "event.hero.price": "Percuma",
      "event.hero.category": "Bengkel",
      "event.hero.organizer": "Tech Academy BD",
      "event.hero.registerButton": "Daftar Sekarang",
      "event.hero.shareButton": "Kongsi Acara",
      
      // Events Page Malay Translations
      "events.page.title": "Terokai Semua Acara",
      "events.page.highlighted": "Acara",
      "events.page.description": "Temui acara menakjubkan merentas pelbagai kategori dan peringkat. Cari acara yang sempurna untuk meningkatkan kemahiran dan rangkaian anda.",
      "events.page.cta.title": "Bersedia untuk Mengubah Kemahiran Anda?",
      "events.page.cta.description": "Sertai beribu-ribu profesional yang telah mengubah kerjaya mereka melalui acara kami.",
      "events.page.cta.button": "Lihat Semua Acara Akan Datang",
      
      // Event Categories Malay
      "events.categories.masterclass": "KELAS INDUK",
      "events.categories.bootcamp": "BOOTCAMP",
      "events.categories.conference": "KONFERENS",
      "events.categories.workshop": "BENGKEL",
      "events.categories.summit": "SUMMIT",
      
      // Event Status Malay
      "events.status.live": "LIVE",
      "events.status.comingSoon": "AKAN DATANG",
      "events.status.earlyBird": "AWAL BIRD",
      
      // Event Features Malay
      "events.features.practical": "Praktikal",
      "events.features.interactive": "Interaktif",
      "events.features.networking": "Rangkaian",
      "events.features.resources": "Sumber",
      "events.features.handsOn": "Hands-on",
      "events.features.projectBased": "Berasaskan projek",
      "events.features.careerSupport": "Sokongan Kerjaya",
      "events.features.mobileFirst": "Mobile First",
      "events.features.analytics": "Analitik",
      "events.features.aiMl": "AI/ML",
      "events.features.research": "Penyelidikan",
      "events.features.global": "Global",
      "events.features.creative": "Kreatif",
      "events.features.prototyping": "Prototaip",
      "events.features.userResearch": "Penyelidikan Pengguna",
      "events.features.tools": "Alat",
      "events.features.blockchain": "Blockchain",
      "events.features.nft": "NFT",
      "events.features.defi": "DeFi",
      "events.features.web3": "Web3",
      "events.features.writing": "Penulisan",
      "events.features.seo": "SEO",
      "events.features.video": "Video",
      
      // Event Types Malay
      "events.types.workshop": "Bengkel",
      "events.types.bootcamp": "Bootcamp",
      "events.types.conference": "Konferens",
      "events.types.masterclass": "Kelas Induk",
      
      // Event Levels Malay
      "events.levels.beginner": "Pemula",
      "events.levels.intermediate": "Pertengahan",
      "events.levels.advanced": "Lanjutan",
      
      // Testimonials Malay
      "events.testimonials.title": "Apa Kata Peserta",
      "events.testimonials.subtitle": "Sertai beribu-ribu peserta yang berpuas hati",
      "events.testimonials.content": "Acara ini mengubah pendekatan saya terhadap pemasaran digital. Pembicaranya luar biasa dan peluang rangkaian benar-benar tidak ternilai! Saya telah melaksanakan strategi yang meningkatkan ROI kami sebanyak 40%.",
      
      // Filter Labels Malay
      "events.filters.category": "Kategori",
      "events.filters.priceRange": "Julat Harga",
      "events.filters.date": "Tarikh",
      "events.filters.level": "Tahap",
      "events.filters.type": "Jenis",
      "events.filters.all": "Semua",
      "events.filters.eventCount": "{{count}} acara ditemui",
      
      // Buttons and Actions Malay
      "events.actions.register": "Daftar",
      "events.actions.share": "Kongsi",
      "events.actions.viewDetails": "Lihat Butiran",
      "events.actions.bookmark": "Tanda Buku",
      "events.actions.like": "Suka",

       // Event Filters Malay Translations
      "events.filters.title": "Penapis",
      "events.filters.category": "Kategori",
      "events.filters.priceRange": "Julat Harga",
      "events.filters.date": "Tarikh",
      "events.filters.level": "Tahap",
      "events.filters.type": "Jenis",
      "events.filters.all": "Semua",
      "events.filters.eventCount": "{{count}} acara",
      "events.filters.under50": "Bawah $50",
      "events.filters.fiftyTo200": "$50-200",
      "events.filters.clearAll": "Kosongkan Semua Penapis",

      // Shop Hero Malay Translations
      "shop.hero.badge": "Pengetahuan Menanti",
      "shop.hero.title": "Temui Seterusnya Anda",
      "shop.hero.highlighted": "Buku Kegemaran",
      "shop.hero.description": "Terokai koleksi buku kami yang luas merentas semua genre. Dari buku terlaris kepada permata tersembunyi, cari bacaan yang sempurna untuk setiap citarasa dan minat.",
      "shop.hero.searchPlaceholder": "Cari buku, pengarang, atau kategori...",
      "shop.hero.stats.books": "Buku",
      "shop.hero.stats.free": "Percuma",
      "shop.hero.stats.categories": "Kategori",
      "shop.hero.stats.shipping": "Penghantaran",
      "shop.hero.stats.support": "Sokongan",
      
      // Filter Sidebar Malay Translations
      "shop.filters.title": "Penapis",
      "shop.filters.showingResults": "Menunjukkan {{count}} produk",
      "shop.filters.categories": "Kategori",
      "shop.filters.allCategories": "Semua Kategori",
      "shop.filters.electronics": "Elektronik",
      "shop.filters.clothing": "Pakaian",
      "shop.filters.accessories": "Aksesori",
      "shop.filters.sports": "Sukan",
      "shop.filters.homeGarden": "Rumah & Taman",
      "shop.filters.priceRange": "Julat Harga",
      "shop.filters.under50": "Bawah $50",
      "shop.filters.fiftyTo200": "$50-$200",
      "shop.filters.minimumRating": "Rating Minimum",
      "shop.filters.andUp": "& Ke Atas",
      "shop.filters.clearAll": "Kosongkan Semua Penapis",

      "shop.productsTitle": "Semua Produk",
      "shop.noProducts.title": "Tiada produk ditemui",
      "shop.noProducts.subtitle": "Cuba laraskan penapis anda untuk mencari lebih banyak produk.",
      "shop.sort.featured": "Pilihan Teratas",
      "shop.sort.lowToHigh": "Harga: Rendah ke Tinggi",
      "shop.sort.highToLow": "Harga: Tinggi ke Rendah",
      "shop.sort.rating": "Penilaian Tertinggi",
      "shop.sort.nameAZ": "Nama A-Z",

      "cart.title": "Troli Belian",
      "cart.emptyTitle": "Troli anda kosong",
      "cart.emptySubtitle": "Tambah beberapa produk untuk bermula!",
      "cart.continueShopping": "Teruskan Membeli-belah",
      "cart.remove": "Buang",
      "cart.subtotal": "Jumlah Kecil",
      "cart.shipping": "Penghantaran",
      "cart.free": "Percuma",
      "cart.total": "Jumlah",
      "cart.checkout": "Teruskan ke Pembayaran",



    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ["en", "ms"],
    fallbackLng: "en",
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
    },
    react: { 
      useSuspense: false 
    },
  });

export default i18n;