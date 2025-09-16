"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import  Heading  from "../../components/globalcomponents/Heading";

import "swiper/css"
import "swiper/css/pagination"

const testimonials = [
  {
    id: 1,
    img: "/images/team1.png",
    text: "I truly can't say enough good things about the job Usman did for me. His communication was clear, professional, and consistent from start to finish. He delivered ahead of schedule and handled all of my revisions with patience and attention to detail — even though I was very specific about what I wanted. On top of that, he brought fresh ideas to the table that improved my project in ways I hadn't considered. I wholeheartedly recommend Usman to anyone reading this. I couldn't be more confident in his abilities, and I fully intend to use him for every single project I have moving forward. He's not just a great web developer — he's also skilled at building systems and handling complex integrations with platforms like Mailchimp, Make.com, and Zapier. Ten out of ten. Highly recommended.",
    author: "Micheal Lutz",
    role: "TapMeSaveMe Founder",
  },
  {
    id: 2,
    img: "/images/team2.png",
    text: "Great Asset for everything related to Website development activities. Looking forward for more future associations.",
    author: "Rohit Kumar",
    role: "Founder, Oxygen BI",
  },
  {
    id: 3,
    img: "/images/team3.png",
    text: "Usman took my vision of the emissions calculator to another level. He spent hours researching the flight emissions process to ensure accurate calculations. He is dedicated to every project he does and is always receptive/responsive to feedback.",
    author: "Samran Ali",
    role: "Manager at Environmental Defense Fund (EDF)",
  },
]

export default function TestimonialsSection() {
  const [expanded, setExpanded] = useState({})

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const getTruncatedText = (text, id) => {
    const maxLength = 200 // Approximate for ~4 lines at typical font size
    if (text.length <= maxLength || expanded[id]) {
      return text
    }
    return text.slice(0, maxLength) + "..."
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20"> {/* Increased margin-bottom for spacing */}
          <Heading text={"Testimonials"} />
          <h2
            data-aos="zoom-in"
            className="text-2xl md:text-3xl lg:text-4xl font-semibold"
          >
            Check what's clients say about
            <br />
            <span className="bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent font-semibold">Curelogics</span>
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          loop
          className="relative"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-2xl shadow-lg p-10 max-w-3xl mx-auto">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-gray-900 text-xl md:text-2xl font-medium leading-relaxed mb-8 text-justify">
                  “{getTruncatedText(testimonial.text, testimonial.id)}”
                  {testimonial.text.length > 200 && (
                    <button
                      onClick={() => toggleReadMore(testimonial.id)}
                      className="text-indigo-600 hover:text-indigo-800 text-base font-semibold mt-2 block"
                    >
                      {expanded[testimonial.id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.img || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx>{`
          .swiper-pagination-bullet {
            background: #cbd5e1;
            opacity: 0.5;
          }
          .swiper-pagination-bullet-active {
            background: #4f46e5; /* indigo */
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  )
}