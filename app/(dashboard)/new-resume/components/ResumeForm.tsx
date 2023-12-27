"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "ai";
import { useChat } from "ai/react";
import React, { useEffect, useState } from "react";
import { Resume } from "@prisma/client";
import { prismadb } from "@/lib/prismadb";
import axios from "axios";
import { Switch } from "@/components/ui/switch";

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

const ResumeForm = () => {
  const [name, setName] = useState("");
  const [defaultResume, setDefault] = useState(false);
  const {
    messages,
    handleSubmit: handleOpenAIChatSubmit,
    input,
    handleInputChange,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/openai",
    onFinish: async (message: Message) => {
      console.log("output json", message);
      await axios.request({
        url: "/api/resume",
        method: "POST",
        data: {
          name,
          description: input,
          generatedJSON: message.content,
          default: defaultResume,
          slug: name.toLowerCase().replace(" ", "-"),
        },
      });
    },
  });

  useEffect(() => {
    setMessages([{ role: "system", content: prompt, id: "1" }]);
  }, [setMessages]);

  return (
    <form
      className="grid grid-cols-12 gap-4 p-8"
      onSubmit={handleOpenAIChatSubmit}
    >
      {isLoading && <div className="col-span-12 text-center">Loading ....</div>}
      <div className="col-span-12 max-w-64">
        <Label htmlFor="resume-name">Resume Name</Label>
        <Input
          name="resume-name"
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="col-span-12 space-x-2">
        <Label htmlFor="default-resume">Default</Label>
        <Switch
          name="default-resume"
          checked={defaultResume}
          onCheckedChange={setDefault}
          disabled={isLoading}
        />
      </div>
      <div className="col-span-6">
        <Label htmlFor="resume">Resume</Label>
        <Textarea
          name="resume"
          rows={10}
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Paste your resume in text format here"
        />
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
