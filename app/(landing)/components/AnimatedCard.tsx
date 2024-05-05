"use client";

import { useEffect, useMemo, useRef } from "react";

const AnimatedCard = ({ children }: React.PropsWithChildren<any>) => {
  const animatedDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      console.log("IntersectionObserver in window", animatedDivRef.current);
      const observer = new IntersectionObserver((entries) => {
        console.log("entries", entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting && animatedDivRef.current) {
            animatedDivRef.current.classList.remove("translate-y-32");
            animatedDivRef.current.classList.add(
              "translate-y-0",
              "transition-all",
              "duration-1000",
              "ease-in-out"
            );
          }
        });
      });
      if (animatedDivRef.current) {
        observer?.observe(animatedDivRef.current);
      }
    }
  }, []);

  return (
    <div ref={animatedDivRef} className="translate-y-32">
      {children}
    </div>
  );
};

export default AnimatedCard;
