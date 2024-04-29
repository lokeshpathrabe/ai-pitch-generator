import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/api";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ThemeSelector } from "@/components/ThemeSelector";

async function LandingPageNavbar() {
  const user: User | null = await currentUser();

  return (
    <nav className="flex w-screen items-center justify-between p-4">
      <Image
        className="drop-shadow-2xl cursor-pointer"
        src="/logo.svg"
        width={100}
        height={200}
        alt="ai-pitch"
      />
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
