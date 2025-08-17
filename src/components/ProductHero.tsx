"use client";

import Image from "next/image";
import { useState } from "react";

const slides = [
  {
    src: "https://picsum.photos/id/1018/1200/400",
    title: "Producto Uno",
    desc: "Descripción breve.",
    href: "/producto/1",
  },
  {
    src: "https://picsum.photos/id/1025/1200/400",
    title: "Producto Dos",
    desc: "Descripción breve.",
    href: "/producto/2",
  },
  {
    src: "https://picsum.photos/id/1033/1200/400",
    title: "Producto Tres",
    desc: "Descripción breve.",
    href: "/producto/3",
  },
  {
    src: "https://picsum.photos/id/1050/1200/400",
    title: "Producto Cuatro",
    desc: "Descripción breve.",
    href: "/producto/4",
  },
  {
    src: "https://picsum.photos/id/1062/1200/400",
    title: "Producto Cinco",
    desc: "Descripción breve.",
    href: "/producto/5",
  },
];

export default function ProductHero() {
  const [active, setActive] = useState(0);

  const prevSlide = () =>
    setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const goToSlide = (idx: number) => setActive(idx);

  return (
    <div className="relative w-full mx-auto rounded-3xl overflow-hidden shadow-xl" id="hero">
      {/* Imagen de fondo */}
      <div className="relative h-64 sm:h-80 md:h-[32rem] w-full">
        <Image
          src={slides[active].src}
          alt={`Slide ${active + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay poligonal */}
        <div
          className="absolute left-0 top-0 h-full w-[80%] sm:w-[70%] md:w-[65%]
                     bg-[#A3BED6] dark:bg-[#111827] 
                     flex flex-col justify-center p-4 sm:p-6 md:p-10 
                     z-10 rounded-2xl shadow-lg"
          style={{
            clipPath: "polygon(55% 0, 69% 49%, 55% 100%, 0 100%, 0 0)",
          }}
        >
          <div className="ml-4 sm:ml-8 md:ml-20 max-w-md">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight text-black dark:text-white">
              {slides[active].title}
            </h1>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base/6 opacity-90 text-black dark:text-white">
              {slides[active].desc}
            </p>
            <a
              href={slides[active].href}
              className="
                mt-4 sm:mt-6 inline-block px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base
                font-semibold uppercase rounded-lg shadow-lg transition-all duration-500
                bg-gradient-to-r from-[#314755] via-[#26a0da] to-[#314755]
                bg-[length:200%_auto] hover:bg-right
                dark:from-[#614385] dark:via-[#516395] dark:to-[#614385]
                border-2 border-white/50 dark:border-white/30
              "
            >
              Ver producto
            </a>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 md:left-8 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/60 z-20 shadow"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-800" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 md:right-8 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/60 z-20 shadow"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-800" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Indicadores */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-4 sm:bottom-6 left-1/2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${
              active === idx ? "bg-blue-600" : "bg-white/60 backdrop-blur"
            }`}
            aria-current={active === idx}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}
