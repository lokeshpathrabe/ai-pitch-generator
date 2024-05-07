"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ThemeSelector } from "./ThemeSelector";
import Logo from "./Logo";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { MANAGE_RESUME_ROUTE, NEW_PITCH_ROUTE } from "@/lib/constants";
import { useAccount } from "./AccountProvider";
import { CreditsMenu } from "./CreditsMenu";

const routes = [
  {
    name: "Generate Pitch",
    path: NEW_PITCH_ROUTE,
  },
  {
    name: "Manage Resume",
    path: MANAGE_RESUME_ROUTE,
  },
];

function MobileNavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size="icon">
          <HamburgerMenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routes.map((route) => (
          <DropdownMenuItem key={route.name}>
            <Link href={route.path}>{route.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DashboardNavBar() {
  const pathname = usePathname();
  const account = useAccount();

  return (
    <div className="p-4 flex justify-between items-center text-purple-500 border-b-2">
      <div className="flex gap-2 items-center">
        <div className="sm:hidden">
          <MobileNavMenu />
        </div>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex text-md items-center">
        <div className="space-x-4 hidden sm:flex px-8">
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
          <CreditsMenu account={account} />
          <ThemeSelector />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default DashboardNavBar;
