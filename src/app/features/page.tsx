"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFileAlt,
  FaChartLine,
  FaMagic,
  FaLock,
  FaRobot,
  FaUserGraduate,
} from "react-icons/fa";

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-800 to-teal-500 text-white p-8">
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
            { name: "Pricing", href: "/pricing" },
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
          Powerful Features
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center mb-12"
        >
          Discover how ResumeAI Enhancer can transform your job application
          process.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: FaFileAlt,
              title: "Smart Resume Parsing",
              description:
                "Our AI quickly extracts and analyzes key information from your resume.",
            },
            {
              icon: FaChartLine,
              title: "Job Match Analysis",
              description:
                "Get a detailed breakdown of how well your skills match the job requirements.",
            },
            {
              icon: FaMagic,
              title: "AI-Powered Enhancements",
              description:
                "Receive tailored suggestions to improve your resume and increase your chances.",
            },
            {
              icon: FaLock,
              title: "ATS-Friendly Formatting",
              description:
                "Ensure your resume passes through Applicant Tracking Systems with ease.",
            },
            {
              icon: FaRobot,
              title: "24/7 AI Assistant",
              description:
                "Get instant answers to your resume and job application questions anytime.",
            },
            {
              icon: FaUserGraduate,
              title: "Continuous Learning",
              description:
                "Our AI constantly improves, learning from the latest trends in hiring.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
            >
              <feature.icon className="text-4xl mb-4 text-yellow-300" />
              <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/pricing"
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            Unlock All Features Now!
          </Link>
        </motion.div>
      </main>

      <footer className="mt-12 text-center text-sm">
        <p>© 2024 ResumeAI Enhancer. Your career, supercharged. 🚀</p>
      </footer>
    </div>
  );
}
