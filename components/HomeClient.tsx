"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Publications from "@/components/sections/Publications";
import Projects from "@/components/sections/Projects";
import Teaching from "@/components/sections/Teaching";
import Footer from "@/components/layout/Footer";
import DetailsModal from "@/components/DetailsModal";
import { Project, Publication, TeachingItem } from "@/types";
import { useScrollEffects } from "@/hooks/useScrollEffects";
import { getMarkdownAction } from "@/app/actions";

interface HomeClientProps {
  projectsList: Project[];
  teachingList: TeachingItem[];
  publicationsList: Publication[];
}

export default function HomeClient({ projectsList, teachingList, publicationsList }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollHintHidden } = useScrollEffects(containerRef);

  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    content?: string;
    image?: string;
    tech?: string[];
    period?: string;
    slug?: string;
  } | null>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Simple scroll lock when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedItem]);

  const handleItemClick = async (item: Project | Publication | TeachingItem, category: string) => {
    setActiveCategory(category);
    
    let modalData: any = {
      title: item.title,
      period: (item as any).period || (item as any).year?.toString(),
      slug: item.slug,
    };

    if (category === "projects") {
      modalData.image = (item as Project).image;
      modalData.tech = (item as Project).tech;
    } else if (category === "publications") {
      const pub = item as Publication;
      modalData.tech = [pub.venue, pub.badge].filter(Boolean);
    } else if (category === "teaching") {
      const teach = item as TeachingItem;
      modalData.tech = [teach.org].filter(Boolean);
    }

    if (item.slug) {
      const res = await getMarkdownAction(category, item.slug);
      if (res && res.content) {
        setSelectedItem({
          ...modalData,
          content: res.content,
        });
        return;
      }
    }

    if (item.content) {
      setSelectedItem({
        ...modalData,
        content: item.content,
      });
    }
  };

  const getActiveList = () => {
    if (activeCategory === "projects") return projectsList;
    if (activeCategory === "publications") return publicationsList;
    if (activeCategory === "teaching") return teachingList;
    return [];
  };

  const activeList = getActiveList();
  const currentIndex = selectedItem && activeList.length > 0
    ? activeList.findIndex((p) => p.slug === selectedItem.slug) 
    : -1;

  const handlePrevious = currentIndex > 0 
    ? () => handleItemClick(activeList[currentIndex - 1], activeCategory!) 
    : undefined;

  const handleNext = currentIndex !== -1 && currentIndex < activeList.length - 1 
    ? () => handleItemClick(activeList[currentIndex + 1], activeCategory!) 
    : undefined;

  return (
    <>
      <div id="scroll-container" ref={containerRef}>
        <Hero />
        <Experience />
        <Education />
        <Publications 
          onItemClick={(item) => handleItemClick(item, "publications")} 
          items={publicationsList} 
        />
        <Projects
          onItemClick={(item) => handleItemClick(item, "projects")}
          projects={projectsList}
        />
        <Teaching 
          onItemClick={(item) => handleItemClick(item, "teaching")} 
          items={teachingList} 
        />
        <Footer />
      </div>

      <DetailsModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || ""}
        content={selectedItem?.content || ""}
        image={selectedItem?.image}
        tech={selectedItem?.tech}
        period={selectedItem?.period}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* Scroll hint */}
      <div className={`scroll-hint${scrollHintHidden ? " hidden" : ""}`} aria-hidden="true">
        <svg className="scroll-hint-chevron" viewBox="0 0 28 10">
          <line x1="1" y1="1" x2="14" y2="9" />
          <line x1="27" y1="1" x2="14" y2="9" />
        </svg>
        <svg className="scroll-hint-chevron" viewBox="0 0 28 10">
          <line x1="1" y1="1" x2="14" y2="9" />
          <line x1="27" y1="1" x2="14" y2="9" />
        </svg>
      </div>
    </>
  );
}
