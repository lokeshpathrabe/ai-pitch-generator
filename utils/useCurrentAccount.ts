import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const useCurrentAccount = () => {
  const { userId } = auth();
  if (userId) {
    return prismadb.account
      .findFirst({ where: { userId } })
      .then((account) => account);
  }
  return null;
};
