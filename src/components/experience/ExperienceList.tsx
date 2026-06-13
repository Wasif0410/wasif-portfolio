"use client";

import { useEffect, useRef, useState } from "react";
import { ExperienceCard } from "@/components/experience/ExperienceCard";

type Experience = {
  year: string;
  company: string;
  logo: string;
  role: string;
  description: string;
  bullets: string[];
};

type ExperienceListProps = {
  experiences: Experience[];
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={listRef} className="experience-list">
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={`${experience.year}-${experience.company}`}
          index={index}
          isVisible={isVisible}
          {...experience}
        />
      ))}
    </div>
  );
}
