"use client";
// components/WelcomeSection.tsx
import Image from "next/image";

const images = [
  "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460777/imagencollage4_vcv5cl.jpg",
  "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460765/imagencollage2_kafvtg.jpg",
  "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460773/imagencollage3_rxgn2m.jpg",
  "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460758/imagencollage1_fskuy4.jpg",
];

export default function WelcomeSection() {
  return (
    <section className="flex flex-col md:flex-row gap-8 items-start md:items-stretch mt-12 w-full px-4 sm:px-6 lg:px-12">
      {/* Card de bienvenida */}
      <div className="md:w-1/2 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden bg-white dark:bg-none text-black dark:text-white">
        {/* Título con degradado en claro, blanco en oscuro */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent dark:text-white">
            ¡Bienvenidos a CiberKids!
          </span>
        </h2>

        {/* Párrafo */}
        <p className="text-lg sm:text-xl md:text-2xl text-justify mb-6">
          En CiberKids sabemos que la vida digital de nuestros hijos es tan emocionante como desafiante.<br />
          Encuentra consejos prácticos y recursos confiables para enfrentar el ciberbullying, el acoso, el phishing y otros riesgos en línea.<br />
          <strong>Protegiendo su infancia en la era digital.</strong>
        </p>

        {/* Degradado de fondo solo para modo oscuro */}
        <style jsx>{`
          @media (prefers-color-scheme: dark) {
            div {
              background: linear-gradient(
                135deg,
                oklch(35.9% 0.144 278.697),
                oklch(25.7% 0.09 281.288)
              );
            }
          }
        `}</style>
      </div>

      {/* Collage de imágenes */}
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full min-h-[12rem] sm:min-h-[14rem] md:min-h-[13rem] lg:min-h-[16rem] rounded-2xl overflow-hidden shadow-lg border-2 border-blue-200 dark:border-blue-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-100"
          >
            <Image
              src={src}
              alt={`Collage ${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-2xl transition-all duration-300"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}