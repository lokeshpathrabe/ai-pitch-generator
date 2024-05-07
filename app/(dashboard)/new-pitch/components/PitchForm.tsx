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

interface IPitchForm {
  resume: string;
  generateThirdPerson: boolean;
  jobDescription: string;
}

const PitchForm = ({ resumes }: { resumes: Resume[] }) => {
  const user = useUser();
  const account = useAccount();

  const { register, control, setValue, getValues, reset, formState, trigger } =
    useForm<IPitchForm>();
  const [pitch, setPitch] = useState<string>();
  const {
    messages,
    handleSubmit: handleOpenAIChatSubmit,
    handleInputChange,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/openai",
    onFinish: () => {
      reset();
    },
  });

  const { resume, generateThirdPerson } = getValues();

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

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      <div className="col-span-12 sm:col-span-6 space-y-4">
        {resumes && resumes.length > 0 ? (
          <form
            className="col-span-12 sm:col-span-6 space-y-4"
            onSubmit={async (e) => {
              const isValid = await trigger();
              if (isValid) {
                handleOpenAIChatSubmit(e);
              }
              e.preventDefault();
            }}
          >
            <div className="col-span-12 flex flex-col gap-2">
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
              <Label htmlFor="third-person">
                Generate pitch in third person
              </Label>
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
              <Label htmlFor="resume">Job Description ()</Label>
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
            <Button
              type="submit"
              aria-label="Generate Pitch"
              disabled={isLoading}
              aria-disabled={isLoading}
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
          </form>
        ) : (
          <AddResume />
        )}
      </div>
      <div className="col-span-12 sm:col-span-6">
        <Pitch disabled={isLoading} pitch={pitch} />
      </div>
    </div>
  );
};

export default PitchForm;
