"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect to get started",
      features: ["Up to 50 links", "Basic analytics", "Standard design", "Community support", "Mobile responsive"],
    },
    {
      name: "Pro",
      price: "9.99",
      description: "For professionals",
      features: [
        "Unlimited links",
        "Advanced analytics",
        "Custom design",
        "Priority support",
        "Mobile responsive",
        "Custom domain",
        "Bio section",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced security",
        "Dedicated support",
        "API access",
        "White label",
        "Custom integrations",
      ],
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-balance">
              Choose the perfect plan for your needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/30 md:scale-105"
                    : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-black text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-2 ${!plan.featured && "text-black dark:text-white"}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.featured ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className={plan.featured ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}>/month</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.featured
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
