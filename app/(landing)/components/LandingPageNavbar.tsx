import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/api";
import React from "react";
import { ThemeSelector } from "@/components/ThemeSelector";
import Logo from "@/components/Logo";

async function LandingPageNavbar() {
  const user: User | null = await currentUser();

  return (
    <nav className="flex w-screen items-center justify-between p-4">
      <Logo />
      <div className="text-purple-500 font-semibold text-md">
        {user ? (
          <div className="flex gap-x-4 items-center">
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
