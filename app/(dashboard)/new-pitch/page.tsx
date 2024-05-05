import React from "react";
import { prismadb } from "@/lib/prismadb";
import PitchForm from "./components/PitchForm";
import { useCurrentAccount } from "@/utils/useCurrentAccount";
import { SignInButton } from "@clerk/nextjs";

const getResumes = async (accountId: string) => {
  "use server";
  return prismadb.resume.findMany({
    where: {
      accountId,
    },
  });
};

async function NewPitch() {
  const account = await useCurrentAccount();
  if (account) {
    const resumes = await getResumes(account.id);
    return <PitchForm resumes={resumes} />;
  }
  return <SignInButton />;
}

export default NewPitch;
