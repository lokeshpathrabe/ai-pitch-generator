import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { Resume } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await currentUser();

  const account = await prismadb.account.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (account === null) {
    return new Response("No account found", { status: 401 });
  }

  const {
    name,
    slug,
    description,
    generatedJSON,
    default: defaultResume,
  } = await request.json();

  try {
    await prismadb.resume.create({
      data: {
        name,
        slug,
        description,
        generatedJSON,
        createdAt: new Date(),
        updatedAt: new Date(),
        default: defaultResume,
        accountId: account?.id,
      },
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const user = await currentUser();

  const account = await prismadb.account.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (account === null) {
    return new Response("No account found", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const resumes = await prismadb.resume.findMany({
    where: {
      accountId: account.id,
      ...(slug ? { slug } : {}),
    },
  });

  return NextResponse.json(resumes);
}
