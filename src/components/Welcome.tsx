"use client";
// components/WelcomeSection.tsx
import Image from "next/image";

const images = [
  "https://picsum.photos/id/1025/400/300",
  "https://picsum.photos/id/1015/400/300",
  "https://picsum.photos/id/1035/400/300",
  "https://picsum.photos/id/1045/400/300",
];

export default function WelcomeSection() {
  return (
    <section className="flex flex-col md:flex-row gap-8 items-start md:items-stretch mt-12 w-full px-4 sm:px-6 lg:px-12">
      {/* Card de bienvenida */}
      <div className="md:w-1/2 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden bg-white dark:bg-none text-black dark:text-gray-200">
        {/* Título con degradado en claro, negro en oscuro */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent dark:text-black">
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
                oklch(50% 0.2 281.3),
                oklch(15% 0.08 281.3)
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
        className="relative w-full min-h-[12rem] sm:min-h-[14rem] md:min-h-[13rem] lg:min-h-[16rem] rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 active:scale-110"
        >
        <Image
            src={src}
            alt={`Collage ${idx + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
            priority
        />
        </div>
    ))}
    </div>
    </section>
  );
}

