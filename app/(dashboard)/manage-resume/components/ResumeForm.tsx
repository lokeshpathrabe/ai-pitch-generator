"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "ai";
import { useChat } from "ai/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { MAXIMUM_CHAR_LENGTH_RESUME } from "@/lib/constants";
import { FieldError } from "@/components/ui/fieldError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createResume } from "@/app/actions/resume";

const prompt = `Given a candidate's resume, focus on identifying and extracting software development skills. Provide a detailed list or description of the candidate's technical skills related to software development, including programming languages, frameworks, tools, soft skills, industry experiences, contry visa and work permit that candidate has and other relevant technologies mentioned in the resume. Additionally, highlight any notable strengths related to software development, such as problem-solving abilities, collaboration skills, and project management experience. 
Please format the output in given valid json. The json should summaries all skills on the root level and project specific skills under "experience" array with start and end date of project.
{
  programmingLanguages: [],
  libraries: [],
  frameworks: [],
  tools: [],
  softskills: [],
  industries: [],
  countriesWithWorkPermit: [],
  experience: [
    {
      companyName: "",
      programmingLanguages: [],
      libraries: [],
      frameworks: [],
      tools: [],
      softskills: [],
      industries: [],
      start: "",
      end: "",
    },
  ],
};`;

interface IResumeForm {
  resumeName: string;
  defaultResume: string;
  resume: string;
}

const ResumeForm = () => {
  const { register, formState, trigger, getValues } = useForm<IResumeForm>();
  const router = useRouter();

  const {
    handleSubmit: handleOpenAIChatSubmit,
    input,
    handleInputChange,
    isLoading,
    setMessages,
  } = useChat({
    api: "https://6635f842415f4e1a5e25dda3.mockapi.io/opnenai",
    onFinish: async (message: Message) => {
      const { resumeName, defaultResume } = getValues();

      const resume = await createResume({
        name: resumeName,
        slug: resumeName,
        description: message.content,
        generatedJSON: message.content,
        defaultResume: defaultResume === "true",
      });

      console.log("resume", resume);

      if (resume) {
        router.refresh();
        toast.success("Resume saved successfully");
      }
    },
  });

  useEffect(() => {
    setMessages([{ role: "system", content: prompt, id: "1" }]);
  }, [setMessages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const isValid = await trigger();

    console.log("submitting form", isValid);
    isValid && handleOpenAIChatSubmit(e);
    e.preventDefault();
  };

  return (
    <form className="grid grid-cols-12 gap-4" onSubmit={onSubmit}>
      {isLoading && <div className="col-span-12 text-center">Loading ....</div>}
      <div className="col-span-12 max-w-64 flex flex-col gap-2">
        <Label htmlFor="resume-name">Resume Name</Label>
        <Input
          disabled={isLoading}
          {...register("resumeName", {
            required: true,
            minLength: 5,
          })}
        />
        {formState.errors.resumeName?.type && (
          <FieldError error="Resume name is required and should be minimum 5 characters" />
        )}
      </div>
      <div className="col-span-12 gap-2 flex items-center">
        <Label htmlFor="default-resume">Default</Label>
        <Switch
          disabled={isLoading}
          {...register("defaultResume", {
            required: true,
          })}
        />
      </div>
      <div className="col-span-6 gap-2 flex flex-col">
        <Label htmlFor="resume">{`Resume (${input.length} characters)`}</Label>
        <Textarea
          rows={10}
          value={input}
          placeholder="Paste your resume in text format here"
          {...register("resume", {
            required: true,
            minLength: 200,
            maxLength: MAXIMUM_CHAR_LENGTH_RESUME,
            onChange: (v) => handleInputChange(v),
          })}
        />
      </div>

      {formState.errors.resume?.type && (
        <FieldError
          error={`Resume is required and should be between 200 to ${MAXIMUM_CHAR_LENGTH_RESUME} characters`}
        />
      )}
      <div className="col-span-12">
        <Button
          className="mt-2"
          type="submit"
          aria-label="Save"
          disabled={isLoading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ResumeForm;
