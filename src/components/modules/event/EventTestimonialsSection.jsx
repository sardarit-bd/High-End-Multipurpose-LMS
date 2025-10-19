import React from 'react'
import { FaStar } from 'react-icons/fa'

const EventTestimonialsSection = () => {
  return (
    <section className="relative py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">
              What Attendees Say
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Join thousands of satisfied participants
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
                    "This event transformed my approach to digital marketing.
                    The speakers were incredible and the networking
                    opportunities were absolutely priceless! I've already
                    implemented strategies that boosted our ROI by 40%."
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