import { AboutSection } from "@/components/about/AboutSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ProjectNotebook } from "@/components/projects/ProjectNotebook";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteNav } from "@/components/layout/SiteNav";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { StatusDock } from "@/components/layout/StatusDock";
import { WritingSection } from "@/components/writing/WritingSection";
import { educationEntries, experiences, projectNotebooks, skillGroups } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="toon-sketch-page site-shell min-h-screen w-full pb-20 text-foreground">
      <SiteNav />
      <Hero />

      <section id="about" className="about-page-section page-container pb-20 pt-10 sm:pb-24 sm:pt-12 lg:pt-4">
        <SectionHeading eyebrow="01 / About" />
        <AboutSection />
      </section>

      <section id="experience" className="page-container pb-14 pt-14">
        <SectionHeading eyebrow="02 / Selected Experience" />
        <ExperienceList experiences={experiences} />
      </section>

      <section id="works" className="page-container pb-14 pt-14">
        <SectionHeading eyebrow="03 / Projects" />
        <ProjectNotebook notebooks={projectNotebooks} />
      </section>

      <section id="writing" className="page-container pb-16 pt-16 sm:pb-20 sm:pt-20">
        <SectionHeading eyebrow="04 / Writing" />
        <WritingSection />
      </section>

      <section id="skills" className="page-container pb-16 pt-16 sm:pb-20 sm:pt-20">
        <SectionHeading eyebrow="05 / Technical Skills" />
        <SkillsSection groups={skillGroups} />
      </section>

      <section id="education" className="page-container pb-14 pt-14">
        <SectionHeading eyebrow="06 / Education" />
        {educationEntries.map((entry) => (
          <EducationSection key={entry.school} {...entry} />
        ))}
      </section>

      <Footer />
      <StatusDock />
    </main>
  );
}
