"use client";
import { Account } from "@prisma/client";
import React from "react";

const context = React.createContext<Account | null>(null);

export async function AccountProvider({
  children,
  account,
}: {
  children: React.ReactNode;
  account: Account | null;
}) {
  return <context.Provider value={account}>{children}</context.Provider>;
}

export function useAccount() {
  return React.useContext(context);
}
