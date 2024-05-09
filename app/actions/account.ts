"use server";
import { prismadb } from "@/lib/prismadb";

export async function updateAccountCredits(accountId: string, credits: number) {
  return await prismadb.account.update({
    where: {
      id: accountId,
    },
    data: {
      credits,
    },
  });
}
