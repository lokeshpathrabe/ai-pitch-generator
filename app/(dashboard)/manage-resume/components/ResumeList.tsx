"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Resume } from "@prisma/client";
import { ResumeRow } from "./ResumeRow";

const ResumeList = ({ resumes }: { resumes: Resume[] }) => {
  if (!resumes) return null;

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
          <ResumeRow key={resume.id} resume={resume} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ResumeList;
