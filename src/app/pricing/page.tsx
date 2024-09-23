"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheck, FaCrown, FaRocket } from "react-icons/fa";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "1 Resume Analysis",
        "Basic Job Match Score",
        "Limited Enhancement Suggestions",
      ],
      icon: FaRocket,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Pro",
      price: "$9.99/month",
      features: [
        "Unlimited Resume Analyses",
        "Advanced Job Match Analysis",
        "Comprehensive Enhancement Suggestions",
        "ATS-Friendly Formatting",
        "24/7 AI Assistant Access",
      ],
      icon: FaCrown,
      color: "from-yellow-400 to-orange-500",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-teal-500 text-white p-8">
      <nav className="flex justify-between items-center mb-12">
        <Link
          href="/"
          className="text-3xl font-bold hover:text-teal-300 transition-colors"
        >
          ResumeAI Enhancer
        </Link>
        <div className="flex space-x-4">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Features", href: "/features" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-teal-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-8"
        >
          Choose Your Plan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center mb-12"
        >
          Invest in your career with our powerful AI-driven tools.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white bg-opacity-10 rounded-lg p-8 backdrop-filter backdrop-blur-lg relative ${
                plan.popular ? "border-2 border-yellow-400" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black font-bold py-1 px-4 rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </div>
              )}
              <plan.icon className="text-5xl mb-4 text-yellow-300" />
              <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <FaCheck className="text-green-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full bg-gradient-to-r ${plan.color} text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105`}
              >
                {plan.name === "Basic" ? "Get Started" : "Upgrade Now"}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-xl mb-4">Not sure which plan is right for you?</p>
          <Link
            href="/contact"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            Contact Us for Help
          </Link>
        </motion.div>
      </main>

      <footer className="mt-12 text-center text-sm">
        <p>
          © 2024 ResumeAI Enhancer. Invest in yourself, invest in your future.
          💼
        </p>
      </footer>
    </div>
  );
}
