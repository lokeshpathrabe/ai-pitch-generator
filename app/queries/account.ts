import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function getCurrentAccount() {
  const { userId } = auth();

  if (userId) {
    return await prismadb.account.findFirst({ where: { userId } });
  }
  return null;
}
