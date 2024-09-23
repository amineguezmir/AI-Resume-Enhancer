/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaFileUpload,
  FaRobot,
  FaMagic,
  FaLightbulb,
  FaCopy,
  FaRocket,
  FaLock,
  FaCrown,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import confetti from "canvas-confetti";

const analyzeResume = (
  resume: string,
  jobDescription: string
): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const keywords = [
        "JavaScript",
        "React",
        "Node.js",
        "AI",
        "Machine Learning",
        "TypeScript",
        "Python",
        "AWS",
      ];
      const resumeScore = keywords.reduce(
        (score, keyword) =>
          score +
          (resume.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0),
        0
      );
      const jobScore = keywords.reduce(
        (score, keyword) =>
          score +
          (jobDescription.toLowerCase().includes(keyword.toLowerCase())
            ? 1
            : 0),
        0
      );

      const matchPercentage = Math.round((resumeScore / jobScore) * 100);

      const strengths = keywords.filter((keyword) =>
        resume.toLowerCase().includes(keyword.toLowerCase())
      );
      const weaknesses = keywords.filter(
        (keyword) =>
          !resume.toLowerCase().includes(keyword.toLowerCase()) &&
          jobDescription.toLowerCase().includes(keyword.toLowerCase())
      );

      resolve({
        matchPercentage,
        strengths,
        weaknesses,
        enhancements: [
          "Claim you led a small team on a project (it was just you, but hey, self-leadership counts)",
          `Say you&apos;re an expert in ${
            weaknesses[0] || "something impressive"
          }`,
          "Add 'proficient in AI-powered resume enhancement' to your skills",
          "Mention you can juggle while coding (multitasking at its finest!)",
        ],
      });
    }, 3000);
  });
};

interface AnalysisResult {
  matchPercentage: number;
  strengths: string[];
  weaknesses: string[];
  enhancements: string[];
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rocketControls = useAnimation();
  const [hasAttempted, setHasAttempted] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResume((e.target?.result as string) || "");
      };
      reader.readAsText(file);
    }
  };

  const handleAnalysis = async () => {
    if (!resume || !jobDescription) {
      toast({
        title: "Missing Information",
        description:
          "Please upload or paste your resume and job description before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (hasAttempted) {
      setShowUpgrade(true);
      return;
    }

    setIsAnalyzing(true);
    setStep(2);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    const result = await analyzeResume(resume, jobDescription);
    setAnalysis(result as AnalysisResult);
    setIsAnalyzing(false);
    clearInterval(interval);
    setProgress(100);
    setHasAttempted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const launchRocket = () => {
    rocketControls.start({
      y: [-20, -window.innerHeight],
      transition: { duration: 2, ease: "easeOut" },
    });
    setTimeout(() => {
      rocketControls.set({ y: 0 });
      setStep(4);
    }, 2000);
  };

  useEffect(() => {
    if (showUpgrade) {
      const timeout = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#FFA500", "#FF4500"],
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showUpgrade]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-800 to-teal-500 text-white p-8 overflow-hidden">
      <nav className="flex justify-between items-center mb-12">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold"
        >
          ResumeAI Enhancer
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-4"
        >
          {[
            { name: "About", href: "/about" },
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
        </motion.div>
      </nav>

      <main className="max-w-4xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-8"
        >
          Supercharge Your Job Application
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center mb-12"
        >
          Upload your resume, add the job description, and let our AI work its
          magic. We'll analyze your fit and even suggest some creative
          enhancements!
        </motion.p>

        <motion.div
          className="absolute right-0 bottom-0"
          animate={rocketControls}
        >
          <FaRocket className="text-6xl text-yellow-400" />
        </motion.div>

        {showUpgrade ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-lg p-8 text-center shadow-2xl"
          >
            <FaCrown className="text-6xl mx-auto mb-4 text-yellow-300" />
            <h3 className="text-3xl font-bold mb-4">
              Unlock the Full Power of AI!
            </h3>
            <p className="text-xl mb-6">
              You've had a taste of our AI magic, but there's so much more
              waiting for you! Upgrade now to access unlimited analyses,
              advanced insights, and our secret sauce for resume perfection.
            </p>
            <Link href="/pricing">
              <Button className="bg-white text-purple-600 hover:bg-yellow-100 text-lg py-3 px-6 rounded-full transition-all transform hover:scale-105">
                Upgrade to Royal Resume Status 👑
              </Button>
            </Link>
            <p className="mt-4 text-sm">
              "Don&apos;t let your dream job slip away. Upgrade now and stand
              out from the crowd!"
            </p>
          </motion.div>
        ) : (
          <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-filter backdrop-blur-lg">
            <div className="flex justify-between mb-8">
              {[
                { icon: FaFileUpload, title: "Upload Resume" },
                { icon: FaRobot, title: "AI Analysis" },
                { icon: FaMagic, title: "Get Insights" },
                { icon: FaLightbulb, title: "Enhance Resume" },
              ].map((s, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex flex-col items-center ${
                    step > index ? "text-teal-300" : ""
                  }`}
                >
                  <s.icon className="text-3xl mb-2" />
                  <span className="text-sm">{s.title}</span>
                </motion.div>
              ))}
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 bg-teal-500 hover:bg-teal-600"
                  >
                    <FaFileUpload className="mr-2" /> Upload Resume
                  </Button>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".txt,.pdf,.doc,.docx"
                  />
                  <Button
                    onClick={() => setResume("")}
                    className="flex-1 bg-purple-500 hover:bg-purple-600"
                  >
                    <FaCopy className="mr-2" /> Paste Resume
                  </Button>
                </div>
                {resume ? (
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <p className="font-bold">
                      Resume uploaded/pasted successfully!
                    </p>
                  </div>
                ) : (
                  <Textarea
                    placeholder="Or paste your resume here..."
                    className="bg-white bg-opacity-50 h-32"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                  />
                )}
                <Textarea
                  placeholder="Paste job description here..."
                  className="bg-white bg-opacity-50 h-32"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <Button
                  onClick={handleAnalysis}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {hasAttempted
                    ? "Try Premium Analysis"
                    : "Analyze My Application"}
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <FaRobot className="text-6xl mx-auto mb-4 animate-bounce" />
                <p className="text-xl mb-4">
                  Our AI is analyzing your application...
                </p>
                <Progress value={progress} className="w-full h-2 mb-4" />
                {!isAnalyzing && (
                  <Button
                    onClick={launchRocket}
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    Launch Results Rocket!
                  </Button>
                )}
              </motion.div>
            )}

            {step === 3 && analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold mb-4">Analysis Results</h3>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <p className="font-bold">
                    Match Score: {analysis.matchPercentage}%
                  </p>
                  <p>
                    {analysis.matchPercentage > 70
                      ? "You're a rockstar! 🎸"
                      : "Let's polish that resume! 💎"}
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <p className="font-bold">Strengths:</p>
                  <ul className="list-disc list-inside">
                    {analysis.strengths
                      .slice(0, 2)
                      .map((strength: string, index: number) => (
                        <li key={index}>{strength}</li>
                      ))}
                    {analysis.strengths.length > 2 && (
                      <li className="text-yellow-300">
                        <FaLock className="inline mr-2" />
                        Unlock more strengths with Premium!
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <p className="font-bold">Areas to Improve:</p>
                  <ul className="list-disc list-inside">
                    {analysis.weaknesses
                      .slice(0, 1)
                      .map((weakness: string, index: number) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    <li className="text-yellow-300">
                      <FaLock className="inline mr-2" />
                      Unlock more insights with Premium!
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => setStep(4)}
                  className="w-full bg-pink-500 hover:bg-pink-600"
                >
                  Show Me the Magic Tricks 🎩✨
                </Button>
              </motion.div>
            )}

            {step === 4 && analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold mb-4">
                  Resume Enhancement Suggestions
                </h3>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <p className="font-bold text-yellow-300 mb-2">
                    Caution: Use these at your own risk! 🚀
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    {analysis.enhancements
                      .slice(0, 2)
                      .map((enhancement: string, index: number) => (
                        <li key={index}>{enhancement}</li>
                      ))}
                    <li className="text-yellow-300">
                      <FaLock className="inline mr-2" />
                      Unlock more detailed enhancements with Premium!
                    </li>
                  </ul>
                </div>
                <p className="text-sm italic">
                  Remember, honesty is the best policy... most of the time. 😉
                </p>
                <Button
                  onClick={() => setShowUpgrade(true)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                >
                  Unlock Full AI Power! 🚀
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-sm">
        <p>
          © 2024 ResumeAI Enhancer. Use responsibly (or not, we won't tell). 🤫
        </p>
      </footer>
    </div>
  );
}
