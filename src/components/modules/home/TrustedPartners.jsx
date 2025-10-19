"use client";

import { useTranslation } from "react-i18next";

export default function TrustedPartners() {
  const { t } = useTranslation();

  const partners = [
    { name: "Loom", logo: "/logos/loom.svg" },
    { name: "Lattice", logo: "/logos/lattice.svg" },
    { name: "Airtable", logo: "/logos/airtable.svg" },
    { name: "Dropbox", logo: "/logos/dropbox.svg" },
    { name: "GitLab", logo: "/logos/gitlab.svg" },
    { name: "ClickUp", logo: "/logos/clickup.svg" },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto text-center px-4">
        <p className="text-[var(--color-secondary)] font-medium text-sm mb-4">
          {t("partners.title") || "Trusted by 20+ Institutions Around the World"}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((p, i) => (
            <div
              key={i}
              className="transition-transform duration-300 hover:scale-105"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}