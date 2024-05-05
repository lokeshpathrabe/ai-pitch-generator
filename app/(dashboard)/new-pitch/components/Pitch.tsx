import { RichTextEditor } from "@/components/RickTextEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

const Pitch = ({ disabled, pitch }: { disabled: boolean; pitch?: string }) => {
  const copyToClipboard = () => {
    if (pitch) {
      navigator.clipboard.writeText(pitch);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gradient-1 to-gradient-2 h-full rounded-lg p-4">
      <div className="flex justify-end py-2">
        <Button variant={"default"} onClick={copyToClipboard}>
          <ClipboardCopyIcon />
        </Button>
      </div>
      <div className="h-full">
        <Textarea
          rows={16}
          name="generatedJson"
          disabled={disabled}
          value={pitch}
          className="bg-background text-foreground"
          readOnly
          aria-readonly
          defaultValue={"Your pitch will appear here"}
        />
      </div>
    </div>
  );
};

export default Pitch;
