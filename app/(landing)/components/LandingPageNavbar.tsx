"use client";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import React from "react";
import { ThemeSelector } from "@/components/ThemeSelector";
import Logo from "@/components/Logo";
import { Account } from "@prisma/client";
import { CreditsMenu } from "@/components/CreditsMenu";

function LandingPageNavbar({ account }: { account: Account | null }) {
  return (
    <nav className="flex w-screen items-center justify-between p-4">
      <Logo />
      <div className="text-purple-500 font-semibold text-md">
        {account ? (
          <div className="flex gap-x-4 items-center">
            <CreditsMenu account={account} />
            <ThemeSelector />
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-x-4 items-center">
            <ThemeSelector />
            <SignInButton />
          </div>
        )}
      </div>
    </nav>
  );
}

export default LandingPageNavbar;
