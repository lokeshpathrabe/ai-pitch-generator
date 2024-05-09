import React from "react";
import LandingPageNavbar from "./components/LandingPageNavbar";
import LandingPageFooter from "./components/LandingPageFooter";
import { AccountProvider } from "@/components/AccountProvider";
import { getCurrentAccount } from "../queries/account";

async function LandingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const account = await getCurrentAccount();
  return (
    <AccountProvider account={account}>
      <section
        id="main-section"
        className="flex min-h-screen flex-col overflow-x-clip"
      >
        <LandingPageNavbar account={account} />
        <div className="flex-grow">{children}</div>
        <LandingPageFooter />
      </section>
    </AccountProvider>
  );
}

export default LandingLayout;
