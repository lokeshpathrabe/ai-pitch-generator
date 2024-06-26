import { Button } from "@/components/ui/button";
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
      <Textarea value={pitch} rows={20} />
    </div>
  );
};

export default Pitch;
