"use client";
import { Account } from "@prisma/client";
import React from "react";

const context = React.createContext<Account | null>(null);

export function AccountProvider({
  children,
  account,
}: {
  children: React.ReactNode;
  account: Account | null;
}) {
  return <context.Provider value={account}>{children}</context.Provider>;
}

export function useAccount() {
  const account = React.useContext(context);
  if (account === null) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return account;
}
