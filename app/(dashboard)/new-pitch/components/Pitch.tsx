import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Pitch = ({ disabled, pitch }: { disabled: boolean; pitch: string }) => {
  return (
    <div className="bg-gradient-to-r from-gradient-1 to-gradient-2 h-full">
      <div className="p-8 white-dotted-background h-full">
        <Label htmlFor="generatedJson">Pitch</Label>
        <Textarea
          rows={16}
          name="generatedJson"
          disabled={disabled}
          value={pitch}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default Pitch;
