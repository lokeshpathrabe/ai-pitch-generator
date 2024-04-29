"use client";

import { useEffect, useMemo, useRef } from "react";

const AnimatedCard = ({ children }: React.PropsWithChildren<any>) => {
  const animatedDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && animatedDivRef.current) {
            console.log("triggered", entry.target, animatedDivRef.current);
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
    <div ref={animatedDivRef} className="translate-y-10">
      {children}
    </div>
  );
};

export default AnimatedCard;
