"use client";
import { Award, Download } from "lucide-react";
import Image from "next/image";

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      course: "React for Beginners",
      instructor: "John Smith",
      date: "2024-09-10",
      image: "/images/certificate-1.jpg", 
    },
    {
      id: 2,
      course: "Advanced Next.js",
      instructor: "Emily Johnson",
      date: "2024-10-01",
      image: "/images/certificate-1.jpg",
    },
    {
      id: 3,
      course: "Tailwind CSS Mastery",
      instructor: "Michael Brown",
      date: "2024-10-05",
      image: "/images/certificate-1.jpg",
    },
  ];

  return (
    <div className="text-[var(--color-text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-[--color-text] flex items-center gap-2">
          <Award className="text-[--color-primary]" />
          My Certificates
        </h1>
      </div>

      {/* Certificates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-[--radius-card] shadow-md p-4 flex flex-col"
          >
            {/* Certificate Preview */}
            <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={cert.image}
                alt={cert.course}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="mt-4 flex-1">
              <h2 className="text-lg font-semibold text-[--color-text]">
                {cert.course}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Instructor: {cert.instructor}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Issued on {cert.date}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-[var(--color-text)] text-sm rounded-[--radius-default] shadow-sm">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="text-center py-10 bg-white rounded-[--radius-card] shadow-md">
          <Award className="mx-auto text-gray-400 w-12 h-12 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">
            No certificates yet
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Complete a course to earn your first certificate.
          </p>
        </div>
      )}
    </div>
  );
}
