import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Pitch = ({ disabled, pitch }: { disabled: boolean; pitch: string }) => {
  return (
    <div className="bg-gradient-to-r from-gradient-1 to-gradient-2 h-full rounded-lg">
      <div className="p-8 h-full overflow-auto">
        <Label htmlFor="generatedJson" className="text-lg">
          Pitch
        </Label>
        <Textarea
          rows={16}
          name="generatedJson"
          disabled={disabled}
          value={pitch}
          className="bg-background text-foreground"
          readOnly
          aria-readonly
        />
      </div>
    </div>
  );
};

export default Pitch;
