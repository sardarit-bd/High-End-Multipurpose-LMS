"use client";

import Image from "next/image";

export default function PartnerBrands() {
  const brands = [
    { name: "Miro", logo: "/images/miro.svg" },
    { name: "Feedly", logo: "/images/feedly.svg" },
    { name: "HubSpot", logo: "/images/hubspot.svg" },
  ];

  return (
    <section className="bg-black py-16 px-6 md:px-12 lg:px-20">
      <div className="container px-4 mx-auto flex flex-wrap justify-center items-center gap-10 md:gap-20">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={100}
              height={40}
              className="object-contain brightness-0 invert group-hover:opacity-90"
            />
            {/* <span className="hidden md:block text-white text-lg font-medium">
              {brand.name}
            </span> */}
          </div>
        ))}
      </div>
    </section>
  );
}
