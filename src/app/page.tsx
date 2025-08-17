
"use client";

import { useState, useCallback, useRef, useEffect } from "react";


import ProductHero from "../components/ProductHero";
import WelcomeSection from "@/components/Welcome";
import QuickLinks from "@/components/QuickLinks";
import ArticlesSection from "@/components/ArticlesSection";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Scroll hacia artículos
  const scrollToArticles = useCallback(() => {
    const el = document.getElementById("articles");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Cuando el chat se abre, hacer scroll hacia él
  useEffect(() => {
    if (chatOpen && chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chatOpen]);

  return (
    <div className="font-sans min-h-screen pt-4 px-8 pb-20 sm:px-20 sm:pt-4 sm:pb-20">
      <main className="flex flex-col gap-[32px] w-full">
        <ProductHero />
        <WelcomeSection />

        <QuickLinks
          openChat={() => setChatOpen(true)}
          scrollToArticles={scrollToArticles}
        />

        {chatOpen && (
          <div ref={chatRef} className="transition-all duration-500 scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32">
            <ChatWidget close={() => setChatOpen(false)} />
          </div>
        )}

        <ArticlesSection />
      </main>
    </div>
  );
}


