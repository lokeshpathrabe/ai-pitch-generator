import { AccountProvider } from "@/components/AccountProvider";
import DashboardNavbar from "@/components/DashboardNavbar";
import { useCurrentAccount } from "@/utils/useCurrentAccount";
import React from "react";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = await useCurrentAccount();
  return (
    <AccountProvider account={account}>
      <section id="main-section" className="flex flex-col h-full w-full">
        <DashboardNavbar account={account} />
        <div className="px-4 pt-4 h-full w-full sm:max-w-[1200px] mx-auto justify-center">
          {children}
        </div>
        <Toaster />
      </section>
    </AccountProvider>
  );
}
