import React from "react";
import ResumeForm from "./components/ResumeForm";
import { prismadb } from "@/lib/prismadb";
import { useCurrentAccount } from "@/utils/useCurrentAccount";
import ResumeList from "./components/ResumeList";

const getResumes = async (accountId: string) => {
  return prismadb.resume.findMany({
    where: {
      accountId,
    },
  });
};

async function NewResume() {
  const account = await useCurrentAccount();

  if (!account) {
    return <div>No Account found</div>;
  }

  const resumes = await getResumes(account?.id);
  return (
    <div className="flex flex-col">
      <ResumeForm />
      <ResumeList resumes={resumes} />
    </div>
  );
}

export default NewResume;
