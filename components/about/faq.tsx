"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
      transition: { duration: 0.6 },
    },
  }

  const faqs = [
    {
      question: "How do I get started with MyLinks?",
      answer:
        "Simply sign up for a free account, customize your profile, and start adding links. You can have your link hub ready in just minutes!",
    },
    {
      question: "Can I use a custom domain?",
      answer:
        "Yes! Custom domains are available with our Pro plan. You can use your own domain to make your link hub even more professional.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption and security measures to protect your data. All transactions are securely processed.",
    },
    {
      question: "Can I see analytics about my links?",
      answer:
        "Yes, all plans include analytics. You can track clicks, views, and get insights about your audience to optimize your content.",
    },
    {
      question: "How many links can I add?",
      answer:
        "The Free plan allows up to 50 links. Pro and Enterprise plans have unlimited links, so you can add as many as you need.",
    },
    {
      question: "Can I change my design anytime?",
      answer:
        "Yes! You can change your design, colors, and layout anytime directly from your dashboard. All changes are applied instantly.",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Everything you need to know about MyLinks</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold text-black dark:text-white text-left">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
