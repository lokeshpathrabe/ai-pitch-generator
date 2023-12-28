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
import Link from "next/link";

const ResumeList = ({ resumes }: { resumes: Resume[] }) => {
  return (
    <div className="max-w-[1200px] p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/12">Name</TableHead>
            <TableHead className="text-lg w-7/12">Description</TableHead>
            <TableHead className="text-lg w-2/12">Created At</TableHead>
            <TableHead className="text-lg w-1/12">Default</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resumes.map((resume) => (
            <TableRow key={resume.id}>
              <TableCell>{resume.name}</TableCell>
              <TableCell>{resume.description.substring(0, 200)}...</TableCell>
              <TableCell>{resume.createdAt.toUTCString()}</TableCell>
              <TableCell>
                {resume.default ? (
                  <Badge>Default</Badge>
                ) : (
                  <Button variant={"secondary"} className="font-normal">
                    mark as default
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResumeList;
