"use client";

import Image from "next/image";

export default function QuickLinks() {
  return (
    <section className="flex flex-col md:flex-row gap-6 md:gap-8 my-12 w-full justify-center">
      {/* Card de Platica con Chat */}
      <div className="w-full max-w-[600px] h-[200px] bg-gradient-to-r from-[#26a0da] via-[#314755] to-[#26a0da]
                      text-white rounded-2xl shadow-lg flex flex-col justify-center items-center p-4">
        <h2 className="text-xl font-bold mb-1 text-center">Platica con el chat</h2>
        <p className="text-sm text-center opacity-90">Resuelve dudas y conoce más sobre nuestros productos.</p>
      </div>

      {/* Segunda card */}
      <div className="w-full max-w-[600px] h-[200px] bg-gradient-to-r from-[#A3BED6] via-[#ffffff] to-[#A3BED6]
                      text-black rounded-2xl shadow-lg flex flex-col justify-center items-center p-4">
        <h2 className="text-xl font-bold mb-1 text-center">Segunda acción</h2>
        <p className="text-sm text-center opacity-90">Descripción breve de la acción que realizará el usuario.</p>
      </div>
    </section>
  );
}
