import React from "react";

function LandingPageFooter() {
  return (
    <div className="border-t border-primary-foreground bg-background px-5 py-4 text-right">
      <span className="text-gray-600">Contact: </span>
      <span className="font-bold text-purple-500">
        <a
          href="mailto:lokesh.18690@gmail.com"
          className="text-purple-500 hover:underline"
        >
          lokesh.18690@gmail.com
        </a>
      </span>
    </div>
  );
}

export default LandingPageFooter;
