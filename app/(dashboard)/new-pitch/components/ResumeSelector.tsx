import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Resume } from "@prisma/client";

const SelectResume = ({
  resumes,
  onChange,
  value,
}: {
  resumes: Resume[];
  onChange: (slug: string) => void;
  value: string;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a resume" />
      </SelectTrigger>
      <SelectContent>
        {resumes.map((resume) => (
          <SelectItem key={resume.id} value={resume.slug || resume.id}>
            {resume.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectResume;
