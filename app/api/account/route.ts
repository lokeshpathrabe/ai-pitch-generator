import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { generateFromEmail } from "unique-username-generator";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  let account = await prismadb.account.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!account) {
    const baseEmail = user.emailAddresses[0].emailAddress;
    account = await prismadb.account.create({
      data: {
        userId: user.id,
        email: baseEmail,
        username: generateFromEmail(baseEmail, 3),
      },
    });
  }

  return NextResponse.json(
    {
      message: "Account found",
      success: true,
      data: account,
    },
    { status: 200 }
  );
}
