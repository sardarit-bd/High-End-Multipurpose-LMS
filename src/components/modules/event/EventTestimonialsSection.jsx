import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const EventTestimonialsSection = () => {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">
          {t("events.testimonials.title")}
        </h2>
        <p className="mb-12 text-center text-xl text-gray-600">
          {t("events.testimonials.subtitle")}
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((testimonial) => (
            <div
              key={testimonial}
              className="rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl hover:scale-105"
            >
              <div className="mb-6 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="mb-6 text-gray-600 leading-relaxed text-lg">
                "{t("events.testimonials.content")}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 shadow-lg" />
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    Attendee {testimonial}
                  </h4>
                  <p className="text-gray-600">Marketing Manager</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventTestimonialsSection