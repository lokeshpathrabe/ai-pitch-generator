import { Button } from "@/components/ui/button";
import { MANAGE_RESUME_ROUTE } from "@/lib/constants";
import Link from "next/link";

export function AddResume() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">
        You have not added any resumes yet.
      </h1>
      <Link href={MANAGE_RESUME_ROUTE}>
        <Button variant={"default"}>Add Resume</Button>
      </Link>
    </div>
  );
}
