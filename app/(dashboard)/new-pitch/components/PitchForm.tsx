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

    const prompt = `Given the candidates skills in JSON format called resumeJSON with skills and experience of candidate and job description in text format, generate a job pitch for the candidate satisfying the following requirements.
    Identify required and optional skills from job description.
    Generate a job pitch that should highlight candidate skills matching for the job description. 
    If candidate has used required skills from job description in its previous experience then highlight that experience (include company name and role played from resumeJSON).
    If the job requires some skills that candidate does not have then show willingness to learn. Do not add skills or experience that is not listed in resume json
    Highlight softskills and matching domain/industry experience. 
    resumeJSON:${resume?.generatedJSON}
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
    <div className="grid grid-cols-12 gap-4 h-full">
      {isLoading && (
        <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full bg-gray-300 bg-opacity-50">
          <p className="text-center">loading...</p>
        </div>
      )}
      <form
        className="col-span-12 sm:col-span-6 space-y-4 p-8"
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
        <Pitch disabled={isLoading} pitch={pitch} />
      </div>
    </div>
  );
};

export default PitchForm;
