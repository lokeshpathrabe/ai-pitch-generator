"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@clerk/nextjs";
import { Message } from "ai";
import { useChat } from "ai/react";
import React, { useEffect, useState } from "react";
import { Resume } from "@prisma/client";
import { prismadb } from "@/lib/prismadb";
import SelectResume from "./ResumeSelector";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const PitchForm = ({ resumes }: { resumes: Resume[] }) => {
  const [pitch, setPitch] = useState<string>("");
  const [selectedResumeSlug, setSelectedResumeSlug] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [thirdPerson, setThirdPerson] = useState<boolean>(false);
  const {
    messages,
    handleSubmit: handleOpenAIChatSubmit,
    setInput,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/openai",
  });

  useEffect(() => {
    const defaultResume = resumes.find((resume) => resume.default);
    setSelectedResumeSlug(defaultResume?.slug || "");
  }, [resumes]);

  useEffect(() => {
    const resume = resumes.find((resume) => resume.slug === selectedResumeSlug);

    const prompt = `Given the candidates skills in JSON format and job description, generate a job pitch for the candidate satisfying the following requirements.
    Identify required and optional skills from job description.
    The pitch should highlight candidate skills matching for the job description. 
    Also highlight previous experience with company and role details where the must required skills were last used by candidate.
    If the job requires some skills that candidate does not have then show willingness to learn. 
    Highlight softskills and matching domain/industry experience.
    Key skills and experience of candidate:
  ${resume?.generatedJSON}
 `;
    setMessages([{ role: "system", content: prompt, id: "1" }]);
  }, [resumes, selectedResumeSlug, setMessages]);

  useEffect(() => {
    const generatedPitch = messages.find(
      (message) => message.role === "assistant"
    );
    if (generatedPitch?.content) {
      setPitch(generatedPitch.content);
    }
  }, [isLoading, messages]);

  const handleChatInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    setInput(e.target.value);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      {isLoading && <div className="col-span-12 text-center">Loading ....</div>}
      <form
        className="col-span-12 sm:col-span-6 space-y-2"
        onSubmit={handleOpenAIChatSubmit}
      >
        <div className="col-span-12">
          <Label htmlFor="third-person">Resume</Label>
          <SelectResume
            resumes={resumes}
            selectedResumeSlug={selectedResumeSlug || ""}
            onChange={setSelectedResumeSlug}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="third-person">Generate pitch in third person</Label>
          <Switch checked={thirdPerson} onCheckedChange={setThirdPerson} />
        </div>
        <div>
          <Label htmlFor="resume">Job Description</Label>
          <Textarea
            name="job-description"
            rows={10}
            value={jobDescription}
            onChange={handleChatInputChange}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" aria-label="Generate Pitch" disabled={isLoading}>
          Generate Pitch
        </Button>
      </form>
      <div className="col-span-12 sm:col-span-6 space-y-2">
        <Label htmlFor="generatedJson">Pitch</Label>
        <Textarea
          rows={16}
          name="generatedJson"
          disabled={isLoading}
          value={pitch}
        />
      </div>
    </div>
  );
};

export default PitchForm;
