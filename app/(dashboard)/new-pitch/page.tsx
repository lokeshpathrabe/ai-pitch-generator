import React from "react";
import PitchForm from "./components/PitchForm";
import { SignInButton } from "@clerk/nextjs";
import { getResumes } from "@/app/queries/resume";

async function NewPitch() {
  const resumes = await getResumes();
  return <PitchForm resumes={resumes} />;
}

export default NewPitch;
