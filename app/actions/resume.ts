"use server";
import { MAXIMUM_CHAR_LENGTH_RESUME } from "@/lib/constants";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { updateAccountCredits } from "./account";
import { getCurrentAccount } from "../queries/account";

const resumeSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().min(1).max(MAXIMUM_CHAR_LENGTH_RESUME),
  generatedJSON: z.string().min(1),
  defaultResume: z.boolean(),
});

export async function createResume({
  name,
  slug,
  description,
  generatedJSON,
  defaultResume,
}: {
  name: string;
  slug: string;
  description: string;
  generatedJSON: string;
  defaultResume: boolean;
}) {
  const validatedData = resumeSchema.parse({
    name,
    slug,
    description,
    generatedJSON,
    defaultResume,
  });

  const account = await getCurrentAccount();

  if (account === null) {
    throw new Error("No account found");
  }

  try {
    const resume = await prismadb.resume.create({
      data: {
        accountId: account?.id,
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description,
        generatedJSON: validatedData.generatedJSON,
        default: validatedData.defaultResume,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await updateAccountCredits(account?.id, Math.max(account?.credits - 1, 0));

    return resume;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return console.log(e.message);
    }
    return console.log("Internal server error");
  }
}

export async function updateResume({
  id,
  name,
  slug,
  description,
  generatedJSON,
  defaultResume,
}: {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  generatedJSON?: string;
  defaultResume?: boolean;
}) {
  try {
    try {
      const validatedData = resumeSchema.partial().parse({
        name,
        slug,
        description,
        generatedJSON,
        defaultResume,
      });

      return await prismadb.resume.update({
        where: {
          id,
        },
        data: {
          ...validatedData,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.log("Input validation error:", error);
      throw new Error("Invalid input");
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return console.log(e.message);
    }
    return console.log("Internal server error");
  }
}

export async function markDefault({ id }: { id: string }) {
  await prismadb.resume.updateMany({
    data: {
      default: false,
    },
  });

  return await prismadb.resume.updateMany({
    data: {
      default: true,
    },
    where: {
      id,
    },
  });
}
