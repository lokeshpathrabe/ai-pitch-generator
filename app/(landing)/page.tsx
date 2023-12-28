import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { HiSparkles } from "react-icons/hi";
import { GiFiles } from "react-icons/gi";
import { PiNotePencilBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import AnimatedCard from "./components/AnimatedCard";

function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CallToAction />
      </main>
    </div>
  );
}

export default LandingPage;

const Hero = () => {
  return (
    <div className="mx-4 mb-14 mt-6 flex flex-1 flex-col items-center text-center sm:mb-12 md:mb-32 md:mt-20">
      <h1 className="max-w-5xl text-2xl font-bold sm:text-4xl md:text-6xl">
        Grab Every Job Opportunity with{" "}
        <span className="bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent">
          {" "}
          AI Generated Pitch{" "}
        </span>
      </h1>

      <p className="sm:text-md mt-5 max-w-2xl text-sm text-gray-600  md:text-xl">
        AI Assisted Job Pitch Generator is a powerful tool that helps job
        seekers create compelling pitches to impress potential employers. With
        AI technology, you can effortlessly generate personalized pitches that
        highlight your skills, experience, and achievements, increasing your
        chances of landing your dream job.
      </p>
      <div className="mt-3 flex max-w-4xl flex-col flex-wrap items-center justify-around sm:w-full sm:flex-row">
        <Link href="/new-pitch">
          <Button variant="default" className="md:text-xl">
            Generate Your First AI Pitch
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center space-y-10 px-8 pb-12 pt-8 sm:py-12 md:flex-row md:space-x-10 md:space-y-0 md:py-20 lg:py-28 2xl:py-32">
      <div className="absolute inset-0 z-0 -skew-y-6 transform bg-gradient-to-r from-purple-100 to-purple-50" />
      <div className="relative z-10 flex flex-col justify-center space-y-10 md:flex-row md:space-x-10 md:space-y-0">
        <FeatureCard
          title="Unique AI Pitch Generator"
          description="Job searching is hard enough already. Let AI do the hard work for you and generate a personalized pitch in seconds."
          icon={<HiSparkles className="h-16 w-16" />}
        />
        <FeatureCard
          title="Manage Mutliple Resumes"
          description="Create multiple resumes and manage them all in one place. Tailor your resume to each job application and increase your chances of landing an interview."
          icon={<GiFiles className="h-16 w-16" />}
        />
        <FeatureCard
          title="A Rich Text Editor"
          description="Our rich text editor allows you to customize your pitch to your linking. Add images, links and more stand out."
          icon={<PiNotePencilBold className="h-16 w-16" />}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="group flex flex-col items-center justify-center rounded-xl border border-purple-200 bg-white p-4 text-center">
      <div className="mb-4 rounded-full bg-purple-500 p-4 text-white group-hover:-translate-y-10 transition-all ease-in-out duration-300">
        {icon}
      </div>
      <h2 className="mt-4 text-xl font-light text-purple-500">{title}</h2>
      <p className="mt-2 italic text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="py-24">
      <h2 className="mb-5 text-center text-5xl font-bold">How It Works</h2>
      <div className="mx-auto flex flex-col md:max-w-7xl md:space-y-12">
        {/* Step 1 */}
        <AnimatedCard>
          <div className="flex flex-col justify-between sm:flex-row-reverse sm:space-y-0">
            <div className="mx-auto w-full md:w-1/2">
              <Image
                className="drop-shadow-2xl"
                src="/images/resume.jpg"
                width={2282}
                height={1354}
                alt="Step 2: resume"
              />
            </div>
            <HowItWorksStep
              title="Step 1: Create Resume"
              description="Create a resume that highlights your skills, experience, and achievements."
              checks={[
                "Add resume in text format",
                "Mutliple resumes for different job applications",
                "Mark your resume as default",
              ]}
            />
          </div>
        </AnimatedCard>
        {/* Step 2 */}
        <AnimatedCard>
          <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
            <div className="mx-auto w-full p-6 md:w-1/2">
              <Image
                className="drop-shadow-2xl rounded-lg"
                src="/images/pitch_screen.jpg"
                width={2732}
                height={1384}
                alt="Step 1: Create Your AI Job Pitch"
              />
            </div>
            <HowItWorksStep
              title="Step 2: Create Your AI Job Pitch"
              description="Define the value proposition and train the AI to ask specific questions."
              checks={[
                "Create best job pitch within minutes",
                "Use your resume to train the AI",
                "Customize your AI Job Pitch",
              ]}
            />
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

const HowItWorksStep = ({
  title,
  description,
  checks,
}: {
  title: string;
  description: string;
  checks: string[];
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
      <h3 className="text-xl font-semibold text-purple-500">{title}</h3>
      <p className="mt-2 font-semibold text-gray-600">{description}</p>
      <ul className="mt-2">
        {checks.map((check, index) => (
          <li
            key={index}
            className="text-grey-400 flex items-center font-light"
          >
            <FaCheck className="mr-2 text-purple-500" />
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-red-500  py-16">
      <h2 className="text-5xl text-white font-bold text-center mb-8">
        Pricing
      </h2>
      <div className="flex flex-col justify-center mx-6 space-y-6 sm:space-x-8 sm:flex-row sm:space-y-0">
        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">Free Plan</CardDescription>
            <CardTitle className="text-4xl">$0/Month</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="mb-2 text-center text-gray-600">
              Generate up to 5 Pitch
            </p>
            <Link href="/lead-magnets">
              <Button variant="outline">Get Started</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">Paid Plan</CardDescription>
            <CardTitle className="text-4xl">$5/Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center text-gray-600">
              Create Unlimited AI Pitch
            </p>
            <Link href="/lead-magnets">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center bg-white px-6 py-16 text-center">
      <h2 className="text-3xl font-bold text-purple-500 sm:text-4xl md:text-5xl">
        Ready to Transform Your Job Application?
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-grey-700 sm:text-xl md:text-2xl">
        Join the AI revolution and start applying for jobs with best pitch.
      </p>
      <Link href="/lead-magnets">
        <Button className="text-sm px-4 py-5 sm:text-lg mt-4">
          Create Your First AI Pitch
        </Button>
      </Link>
    </div>
  );
};
