import React, { Suspense } from "react";
import ResumeForm from "./components/ResumeForm";
import { useCurrentAccount } from "@/utils/useCurrentAccount";
import ResumeList from "./components/ResumeList";
import { getResumes } from "@/app/actions/resume";

async function NewResume() {
  const account = await useCurrentAccount();

  if (!account) {
    return <div>No Account found</div>;
  }

  const resumes = await getResumes(account?.id);

  return (
    <div className="flex flex-col gap-24">
      <ResumeForm />
      {resumes && resumes.length > 0 && <ResumeList resumes={resumes} />}
    </div>
  );
}

export default NewResume;
