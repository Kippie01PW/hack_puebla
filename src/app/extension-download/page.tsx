"use client";
import Image from "next/image";

interface Step {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isDownload?: boolean;
  file?: string;
  fileName?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
}

const steps: Step[] = [
  {
    title: "Descargar la extensión",
    description:
      "Haz clic en el botón para bajar el archivo .zip que contiene la extensión de CiberKids.",
    isDownload: true,
    file: "/CiberKids-Extension.zip",
    fileName: "CiberKids-Extension.zip",
    imageSrc: "/images/DownloadIcon.svg",
    imageAlt: "Icono de descarga",
    imageWidth: 64,
    imageHeight: 64,
    imageClassName: "object-contain border-2",
  },
  {
    title: "Extraer el contenido",
    description:
      "Descomprime el .zip en una carpeta de tu elección para acceder a los archivos.",
    imageSrc: "/images/Extraer.svg",
    imageAlt: "Icono de carpeta",
    imageWidth: 640,
    imageHeight: 320,
    imageClassName: "object-contain rounded-lg",
  },
  {
    title: "Instalar en el navegador",
    description:
      'Abre tu navegador, activa el modo desarrollador en la sección de extensiones y elige "Cargar descomprimida". Selecciona la carpeta donde descomprimiste.',
    imageSrc: "/images/ExtensionNavegador.svg",
    imageAlt: "Icono de navegador",
    imageWidth: 1200,
    imageHeight: 420,
    imageClassName: "object-contain rounded-lg",
  },
  {
    title: "Verificar funcionamiento",
    description:
      "Revisa que el icono de CiberKids aparezca en la barra de herramientas y pruébala en alguna página web.",
    imageSrc: "/images/ExtensionInstalada.svg",
    imageAlt: "Icono de verificación",
    imageWidth: 640,
    imageHeight: 320,
    imageClassName: "object-contain rounded-lg",
  },
];

export default function Extension() {
  return (
    <main className="text-gray-800 dark:text-gray-200">
      {/* Sección principal */}
      <section
      className="
        bg-gradient-to-b from-slate-50 to-neutral-200
        dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-900
        shadow-md mx-5 sm:mx-25 py-8 mb-8
        text-center font-bold text-3xl
        rounded-xl flex flex-col items-center gap-3
      "
    >
      <div className="relative w-40 h-40">
        <Image
          src="/images/LogoCiberKidsLight.webp"
          alt="Logo CiberKids Light"
          fill
          className="object-contain block dark:hidden"
          priority
        />
        <Image
          src="/images/LogoCiberKidsDark.webp"
          alt="Logo CiberKids Dark"
          fill
          className="object-contain hidden dark:block"
          priority
        />
          </div>

          <div className="max-w-md mx-auto text-center bg-transparent rounded p-1">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-3">
            Descarga la extensión
          </h2>
          <p className="text-lg text-gray-900 dark:text-white mb-3">
            Sigue estos pasos para instalar la extensión de CiberKids y disfrutar de una experiencia segura en línea.
          </p>
          <ul className="text-base text-gray-900 dark:text-white list-disc list-inside space-y-2">
            <li>Gemini analiza cada página web y advierte si es apta para niños mediante una extensión para Chrome</li>
            <li>Consulta la guía de instalación</li>
          </ul>
        </div>
    </section>
      

      {/* Grid de pasos */}
      <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => {
          const { imageSrc, imageAlt, imageWidth = 100, imageHeight = 100, imageClassName = "object-contain" } = step;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  className={imageClassName}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Paso {idx + 1}: {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
              </div>

              {step.isDownload && step.file && step.fileName && (
                <a
                  href={step.file}
                  download={step.fileName}
                  className="mt-4 inline-block px-4 py-2 bg-gradient-to-br from-blue-700 to-sky-500 dark:bg-gradient-to-br dark:from-indigo-800 dark:to-fuchsia-900 text-white rounded text-center"
                >
                  Descargar .zip
                </a>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
