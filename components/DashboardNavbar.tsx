"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ThemeSelector } from "./ThemeSelector";

const routes = [
  {
    name: "Generate Pitch",
    path: "/new-pitch",
  },
  {
    name: "Manage Resume",
    path: "/manage-resume",
  },
];

function DashboardNavBar() {
  const pathname = usePathname();

  return (
    <div className="p-4 flex justify-between items-center text-purple-500 border-b-2">
      <Link href="/">
        <Image
          className="drop-shadow-2xl cursor-pointer"
          src="/logo.svg"
          width={100}
          height={200}
          alt="ai-pitch"
        />
      </Link>
      <div className="gap-x-10 text-md items-center hidden sm:flex">
        <div className="space-x-4">
          {routes.map((route, idx) => (
            <Link
              key={idx}
              href={route.path}
              className={
                pathname === route.path ? "border-b border-purple-300" : ""
              }
            >
              {route.name}
            </Link>
          ))}
        </div>

        <div className="flex gap-x-4">
          <ThemeSelector />
          <UserButton afterSignOutUrl="/">
            <div>options</div>
          </UserButton>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavBar;
