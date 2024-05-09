import React from "react";
import ResumeForm from "./components/ResumeForm";
import ResumeList from "./components/ResumeList";
import { getResumes } from "@/app/queries/resume";

async function NewResume() {
  const resumes = await getResumes();

  return (
    <div className="flex flex-col gap-24">
      <ResumeForm />
      <ResumeList resumes={resumes} />
    </div>
  );
}

export default NewResume;
