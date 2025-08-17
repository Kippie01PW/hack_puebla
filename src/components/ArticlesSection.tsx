"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Article {
  title: string;
  description: string;
  img: string;
}

const articles: Article[] = [
  { title: "Artículo 1", description: "Información confiable para eliminar tabúes y fomentar el pensamiento crítico.", img: "https://picsum.photos/id/1011/400/300" },
  { title: "Artículo 2", description: "Recursos claros y seguros sobre la era digital.", img: "https://picsum.photos/id/1012/400/300" },
  { title: "Artículo 3", description: "Consejos prácticos para padres y docentes.", img: "https://picsum.photos/id/1013/400/300" },
  { title: "Artículo 4", description: "Estrategias para proteger a los niños en línea.", img: "https://picsum.photos/id/1014/400/300" },
  { title: "Artículo 5", description: "Guías de ciberseguridad para adolescentes.", img: "https://picsum.photos/id/1015/400/300" },
  { title: "Artículo 6", description: "Cómo identificar riesgos digitales tempranamente.", img: "https://picsum.photos/id/1016/400/300" },
];

export default function ArticlesSection() {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getVisibleCount = () => (window.innerWidth < 640 ? 2 : 3);

  // Medimos el ancho de la tarjeta después de render
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const firstCard = containerRef.current.querySelector<HTMLDivElement>(".article-card");
        if (firstCard) setCardWidth(firstCard.offsetWidth + 16); // 16 = gap en px
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const prev = () => setIndex((prevIdx) => Math.max(prevIdx - getVisibleCount(), 0));
  const next = () => setIndex((prevIdx) => Math.min(prevIdx + getVisibleCount(), articles.length - getVisibleCount()));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= articles.length - getVisibleCount() ? 0 : prev + getVisibleCount()));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="articles"
      className="scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 my-12 px-4 sm:px-6 lg:px-12"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-500 dark:via-blue-400 dark:to-indigo-700 dark:text-transparent">
        Artículos
      </h2>

      <div className="relative overflow-hidden">
        {/* Botón anterior */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800 rounded-full shadow disabled:opacity-40"
        >
          ◀
        </button>

        {/* Contenedor de artículos */}
        <div
          ref={containerRef}
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(-${index * cardWidth}px)` }}
        >
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="article-card flex-shrink-0 w-[45%] sm:w-[30%] rounded-2xl shadow-lg flex flex-col items-center p-4 bg-blue-50 dark:bg-gray-800"
            >
              <div className="w-full h-40 relative mb-4 rounded-xl overflow-hidden">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{article.title}</h3>
              <p className="text-sm md:text-base text-center opacity-90">{article.description}</p>
            </div>
          ))}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={next}
          disabled={index >= articles.length - getVisibleCount()}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800 rounded-full shadow disabled:opacity-40"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
