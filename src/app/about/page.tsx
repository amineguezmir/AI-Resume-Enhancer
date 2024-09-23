"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRocket, FaAirbnb, FaBrain, FaUserTie } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-500 text-white p-8">
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
            { name: "Features", href: "/features" },
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
          About ResumeAI Enhancer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center mb-12"
        >
          We're revolutionizing the job application process with cutting-edge AI
          technology.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: FaRocket,
              title: "Supercharge Your Career",
              description:
                "Our AI-powered tools give you the edge in today's competitive job market.",
            },
            {
              icon: FaAirbnb,
              title: "Advanced AI Analysis",
              description:
                "We use state-of-the-art machine learning to analyze your resume and job descriptions.",
            },
            {
              icon: FaBrain,
              title: "Intelligent Insights",
              description:
                "Get personalized recommendations to improve your chances of landing your dream job.",
            },
            {
              icon: FaUserTie,
              title: "Tailored for Professionals",
              description:
                "Whether you're a fresh graduate or a seasoned pro, we've got you covered.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
            >
              <item.icon className="text-4xl mb-4 text-teal-300" />
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p>{item.description}</p>
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
            href="/"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            Start Enhancing Your Resume Now!
          </Link>
        </motion.div>
      </main>

      <footer className="mt-12 text-center text-sm">
        <p>© 2024 ResumeAI Enhancer. Empowering careers with AI magic. ✨</p>
      </footer>
    </div>
  );
}
