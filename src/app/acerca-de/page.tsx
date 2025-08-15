"use client"
import Image from 'next/image'     
import React from 'react'
import { FaHeart, FaCommentDots } from "react-icons/fa";
import { LuSend } from "react-icons/lu";

export default function AboutUs() {
  return (
    <main className="text-gray-800 dark:text-gray-200">

    <section className="bg-gradient-to-b from-slate-50 to-neutral-200 dark:bg-gradient-to-b dark:from-violet-900 dark:to-indigo-900 shadow-md mx-5 sm:mx-25 py-15 mb-12 text-center font-bold text-5xl rounded-xl">
        <h1>Acerca de CiberKids</h1>
    </section>
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
            <h2 className="text-4xl font-semibold mb-4">Nuestra Visión</h2>
            <Image
                    src="/images/VisionDigital.webp"
                    alt="Misión de CiberKids"
                    width={500}
                    height={150}
                    className="rounded-lg mb-4"
                />
            <div className="flex gap-4 text-2xl mt-2 mb-7">
                <FaHeart />
                <FaCommentDots />
                <LuSend />
            </div>
            <p className="leading-relaxed text-lg text-justify">
              Ser la plataforma digital líder en educación parental, donde la tecnología se convierte en aliada para criar niños felices, seguros y conectados, sin prejuicios ni tabúes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
            <h2 className="text-4xl font-semibold mb-4">Nuestra Misión</h2>
                <Image
                    src="/images/Mision.webp"
                    alt="Misión de CiberKids"
                    width={6000}
                    height={150}
                    className="rounded-lg mb-4"
                />
            <div className="flex gap-4 text-2xl mt-2 mb-7">
                <FaHeart />
                <FaCommentDots />
                <LuSend />
            </div>
            <p className="leading-relaxed text-lg text-justify">
              Empoderar a madres, padres y cuidadores mediante contenido accesible, honesto y actualizado sobre el cuidado infantil en la era digital.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}