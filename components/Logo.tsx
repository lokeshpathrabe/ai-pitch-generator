"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

function Logo() {
  const [logoPath, setLogoPath] = useState("/logo.svg");
  const { theme } = useTheme();

  useEffect(() => {
    setLogoPath(theme === "dark" ? "/logo-dark.svg" : "/logo.svg");
  }, [theme]);

  return (
    <Image
      className="drop-shadow-2xl cursor-pointer"
      src={logoPath}
      width={100}
      height={200}
      alt="ai-pitch"
    />
  );
}

export default Logo;
