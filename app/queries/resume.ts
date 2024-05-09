import { prismadb } from "@/lib/prismadb";
import { getCurrentAccount } from "./account";

export async function getResumes() {
  const account = await getCurrentAccount();
  return prismadb.resume.findMany({
    where: {
      accountId: account?.id,
    },
  });
}
