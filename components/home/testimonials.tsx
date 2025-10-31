"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "MyLinks transformed how I share my content. All my links in one beautiful place. My followers love it!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Digital Marketer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content:
      "The analytics feature is incredible. I can see exactly which links drive the most traffic. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Freelancer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    content: "Professional, easy to use, and completely free. This is exactly what I needed for my portfolio.",
    rating: 5,
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, transition: { duration: 0.5, ease: ("easeOut" as unknown) as any }},
    },
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">Loved by Thousands</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-balance max-w-2xl mx-auto">
            See what our users have to say about MyLinks.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg dark:hover:shadow-blue-500/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Rating */}
              <motion.div className="flex gap-1 mb-4" initial="hidden" animate="visible">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <p className="font-semibold text-black dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
