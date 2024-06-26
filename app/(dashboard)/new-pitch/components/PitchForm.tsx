"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import React, { useEffect, useState } from "react";
import { Resume } from "@prisma/client";
import SelectResume from "./ResumeSelector";
import { Switch } from "@/components/ui/switch";
import Pitch from "./Pitch";
import { AddResume } from "./AddResume";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";
import { Controller, useForm } from "react-hook-form";
import { FieldError } from "@/components/ui/fieldError";
import { MAXIMUM_CHAR_LENGTH_JOB_DESCRIPTION } from "@/lib/constants";
import { useAccount } from "@/components/AccountProvider";
import { updateAccountCredits } from "@/app/actions/account";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IPitchForm {
  resume: string;
  generateThirdPerson: boolean;
  jobDescription: string;
}

const PitchForm = ({ resumes }: { resumes: Resume[] }) => {
  const [updatingAccount, setUpdatingAccount] = useState(false);
  const user = useUser();
  const account = useAccount();
  const router = useRouter();
  const { register, control, setValue, getValues, reset, formState, trigger } =
    useForm<IPitchForm>();
  const [pitch, setPitch] = useState<string>();
  const {
    messages,
    handleSubmit: handleOpenAIChatSubmit,
    handleInputChange,
    isLoading: generatingPitch,
    setMessages,
  } = useChat({
    api: "/api/openai",
    onFinish: async () => {
      console.log("onfinish");
      reset();
      setUpdatingAccount(true);
      try {
        await updateAccountCredits(
          account.id,
          Math.max(account?.credits - 1, 0)
        );
      } catch (e) {
        console.log(e);
        toast.error("Failed to update account credits");
      } finally {
        setUpdatingAccount(false);
        router.refresh();
      }
    },
  });

  const isLoading = generatingPitch || updatingAccount;

  const { resume, generateThirdPerson, jobDescription } = getValues();

  useEffect(() => {
    const defaultResume = resumes.find((resume) => resume.default);
    setValue("resume", defaultResume?.slug || "");
  }, [resumes, setValue]);

  useEffect(() => {
    const selectedResume = resumes.find((r) => r.slug === resume);

    const prompt = `Given the candidates skills in JSON format called resumeJSON with skills and experience of candidate and job description in text format, generate a job pitch for the candidate satisfying the following requirements.
    Identify required and optional skills from job description.
    Generate a job pitch that should highlight candidate skills matching for the job description. 
    ${
      generateThirdPerson
        ? `Generate pitch in third person and user's name ${user.user?.fullName}`
        : "Generate pitch in first person"
    }
    If candidate has used required skills from job description in its previous experience then highlight that experience (include company name and role played from resumeJSON).
    If the job requires some skills that candidate does not have then show willingness to learn. Do not add skills or experience that is not listed in resume json
    Highlight softskills and matching domain/industry experience. 
    resumeJSON:${selectedResume?.generatedJSON}
 `;

    setMessages([{ role: "system", content: prompt, id: "1" }]);
  }, [resumes, resume, setMessages, user.user?.fullName, generateThirdPerson]);

  useEffect(() => {
    const generatedPitch = messages.find(
      (message) => message.role === "assistant"
    );
    if (generatedPitch?.content) {
      setPitch(generatedPitch.content);
    }
  }, [isLoading, messages]);

  const creditAvailable = account?.credits > 0;

  return (
    <div className="flex flex-col gap-16">
      {resumes && resumes.length > 0 ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            const isValid = await trigger();
            if (isValid && creditAvailable) {
              handleOpenAIChatSubmit(e);
            }
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="third-person">Resume</Label>
            <Controller
              control={control}
              name="resume"
              render={({ field }) => (
                <SelectResume
                  resumes={resumes}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex items-center space-x-2 ">
            <Label htmlFor="third-person">Generate pitch in third person</Label>
            <Controller
              control={control}
              name="generateThirdPerson"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="resume">{`Job Description (${
              jobDescription?.length || 0
            } characters)`}</Label>
            <Textarea
              rows={10}
              disabled={isLoading}
              {...register("jobDescription", {
                required: true,
                minLength: 200,
                maxLength: MAXIMUM_CHAR_LENGTH_JOB_DESCRIPTION,
                onChange: (e) => handleInputChange(e),
              })}
            />
            {formState.errors.jobDescription?.type && (
              <FieldError
                error={`Resume is required and should be between 200 to ${MAXIMUM_CHAR_LENGTH_JOB_DESCRIPTION} characters`}
              />
            )}
          </div>
          <div>
            <Button
              type="submit"
              aria-label="Generate Pitch"
              disabled={isLoading || !creditAvailable}
              aria-disabled={isLoading || !creditAvailable}
            >
              {isLoading && (
                <div className="flex gap-2 items-center">
                  <SymbolIcon className="animate-spin" />
                  ai magic in progress...
                </div>
              )}
              {!isLoading &&
                `Generate Pitch (${account?.credits} credits left)`}
            </Button>
          </div>
        </form>
      ) : (
        <AddResume />
      )}
      {pitch && <Pitch disabled={isLoading} pitch={pitch} />}
    </div>
  );
};

export default PitchForm;
