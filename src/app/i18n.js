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
      "instructors": "Instructors",
      "pages": "Pages",
      "checkout": "Checkout",
      "about": "About Us",
      "contact": "Contact",
      "terms": "Terms and Conditions",
      "privacy": "Privacy Policy",
      "faq": "FAQ",
      "success": "Success History",
      "blog": "Blog",
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
      "partners.title": "Trusted by 20+ Institutions Around the World"
    }
  },
  ms: {
    translation: {
      "home": "Laman Utama",
      "courses": "Kursus",
      "pricing": "Harga",
      "dashboard": "Papan Pemuka",
      "instructors": "Tenaga Pengajar",
      "pages": "Halaman",
      "checkout": "Pembayaran",
      "about": "Tentang Kami",
      "contact": "Hubungi Kami",
      "terms": "Terma dan Syarat",
      "privacy": "Dasar Privasi",
      "faq": "Soalan Lazim",
      "success": "Sejarah Kejayaan",
      "blog": "Blog",
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
      "partners.title": "Dipercayai oleh 20+ Institusi di Seluruh Dunia"
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