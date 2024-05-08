"use client";
import { markDefault } from "@/app/actions/resume";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Resume } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function MarkDefault({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    setLoading(true);
    await markDefault({ id });
    setLoading(false);
    router.refresh();
  };
  return loading ? (
    <span>loading</span>
  ) : (
    <Button variant={"outline"} className="font-normal" onClick={onClick}>
      Mark as default
    </Button>
  );
}

export function ResumeRow({ resume }: { resume: Resume }) {
  return (
    <TableRow key={resume.id}>
      <TableCell>{resume.name}</TableCell>
      <TableCell>{resume.description.substring(0, 200)}...</TableCell>
      <TableCell>
        {Intl.DateTimeFormat("en-US").format(new Date(resume.updatedAt))}
      </TableCell>
      <TableCell>
        {resume.default ? (
          <Badge>Default</Badge>
        ) : (
          <MarkDefault id={resume.id} />
        )}
      </TableCell>
    </TableRow>
  );
}
