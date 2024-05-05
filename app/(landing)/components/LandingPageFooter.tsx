import React from "react";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

function LandingPageFooter() {
  return (
    <div className="border-t border-primary-foreground bg-background px-5 py-4 flex justify-end">
      <a
        href="mailto:lokesh.18690@gmail.com"
        className="text-purple-500 hover:underline"
      >
        <EnvelopeClosedIcon />
      </a>
    </div>
  );
}

export default LandingPageFooter;
