"use client";
import { markDefault } from "@/app/actions/resume";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Resume } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ResumeRow } from "./ResumeRow";

const ResumeList = ({ resumes }: { resumes: Resume[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg w-2/12">Name</TableHead>
          <TableHead className="text-lg w-5/12">Description</TableHead>
          <TableHead className="text-lg w-4/12">Created at</TableHead>
          <TableHead className="text-lg w-1/12">Default</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resumes.map((resume) => (
          <Suspense key={Math.random()} fallback={<p>loading...</p>}>
            <ResumeRow resume={resume} />
          </Suspense>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResumeList;
