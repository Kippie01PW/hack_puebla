"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";

interface ImagenArticulo {
  id: number;
  articulo_id: number;
  url: string;
  created_at: string;
}

interface Articulo {
  id: number;
  titulo: string;
  resumen: string;
  created_at: string;
  imagenes_articulos?: ImagenArticulo[];
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Articulo[]>([]);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔹 Actualizar el número de tarjetas visibles según el ancho
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window !== "undefined") {
        setVisibleCount(window.innerWidth < 640 ? 2 : 3);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // 🔹 Fetch a Supabase con relación a imagenes_articulos
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articulo")
        .select(`
          id,
          titulo,
          resumen,
          created_at,
          imagenes_articulos (
            id,
            articulo_id,
            url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error.message);
        return;
      }

      setArticles(data as Articulo[]);
    };

    fetchArticles();
  }, []);

  // 🔹 Medir ancho de tarjeta
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const firstCard =
          containerRef.current.querySelector<HTMLDivElement>(".article-card");
        if (firstCard) setCardWidth(firstCard.offsetWidth + 16);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const prev = () =>
    setIndex((prevIdx) => Math.max(prevIdx - visibleCount, 0));
  const next = () =>
    setIndex((prevIdx) =>
      Math.min(prevIdx + visibleCount, articles.length - visibleCount)
    );

  // Avance automático
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev >= articles.length - visibleCount ? 0 : prev + visibleCount
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [articles, visibleCount]);

  return (
    <section
      id="articles"
      className="scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 my-12 px-4 sm:px-6 lg:px-12"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
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
          {articles.map((article) => {
            const fecha = new Date(article.created_at).toLocaleDateString(
              "es-MX",
              { year: "numeric", month: "long", day: "numeric" }
            );

            // Tomar la primera imagen si existe
            const imgUrl =
              article.imagenes_articulos?.[0]?.url || "/placeholder.jpg";

            return (
              <div
                key={article.id}
                className="article-card flex-shrink-0 w-[45%] sm:w-[30%] rounded-2xl shadow-lg flex flex-col items-center p-4 bg-blue-50 dark:bg-gray-800"
              >
                {/* Imagen del artículo */}
                <div className="w-full h-64 relative mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={imgUrl}
                    alt={article.titulo}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-xl"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-center">
                  {article.titulo}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{fecha}</p>
                <p className="text-sm md:text-base text-center opacity-90">
                  {article.resumen}
                </p>
              </div>
            );
          })}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={next}
          disabled={index >= articles.length - visibleCount}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800 rounded-full shadow disabled:opacity-40"
        >
          ▶
        </button>
      </div>
    </section>
  );
}











