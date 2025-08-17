"use client";

type QuickLinksProps = {
  openChat: () => void;
  scrollToArticles: () => void;
};

export default function QuickLinks({ openChat, scrollToArticles }: QuickLinksProps) {
  return (
    <section className="flex flex-col md:flex-row gap-6 md:gap-8 my-12 w-full justify-center px-4 sm:px-6">
      
      {/* Card de Charla con el Bot */}
      <div
        id="quicklinks-chatbot"
        onClick={openChat}
        className="cursor-pointer w-full max-w-[600px] min-h-[180px] 
         bg-gradient-to-r from-[#26a0da] via-[#2ecc71] to-[#26a0da]
         dark:from-[#1e3a8a] dark:via-[#059669] dark:to-[#1e3a8a]
         text-white dark:text-white rounded-2xl shadow-lg flex flex-col justify-center items-center p-5 transition-all duration-500
         break-words overflow-hidden"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          💬 Charla con el Bot
        </h2>
        <p className="text-lg md:text-xl text-center opacity-90 mb-2">
          Interactúa con nuestro asistente virtual para resolver dudas.
        </p>
        <p className="text-base md:text-lg text-center opacity-80">
          Obtén recomendaciones, guías de uso y consejos prácticos de manera fácil y segura.
        </p>
      </div>

      {/* Card de Revisa los Artículos */}
      <div
        onClick={scrollToArticles}
        className="cursor-pointer w-full max-w-[600px] min-h-[180px] 
         bg-gradient-to-r from-[#A3BED6] via-[#ffffff] to-[#A3BED6]
         dark:from-[#4338ca] dark:via-[#2563eb] dark:to-[#4338ca]
         text-black dark:text-white rounded-2xl shadow-lg flex flex-col justify-center items-center p-5 transition-all duration-500
         break-words overflow-hidden"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          📚 Revisa los Artículos
        </h2>
        <p className="text-lg md:text-xl text-center opacity-90 mb-2">
          Descubre recursos cuidadosamente seleccionados.
        </p>
        <p className="text-base md:text-lg text-center opacity-80">
          Cada artículo proporciona información clara y confiable, fomentando el aprendizaje seguro y el pensamiento crítico en la era digital.
        </p>
      </div>
    </section>
  );
}
