"use client";

import { useState, useRef, useEffect } from "react";

type ChatWidgetProps = {
  close: () => void;
};


export default function ChatWidget({ close }: ChatWidgetProps) {
  // Cambiamos messages para manejar rol (user/assistant)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hola 👋, soy tu asistente virtual. ¡Escribe algo para comenzar!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const sendMessage = async () => {
  if (!input.trim() || loading) return;

  const userMessage = { role: "user" as const, content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {   // IMPORTANTE: ya no "/api/chat"
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    if (data.reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "No pude procesar tu solicitud." },
      ]);
    }
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Error de conexión. Intenta más tarde." },
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center w-full mt-6">
      <div
        ref={containerRef}
        className="w-full max-w-3xl h-[400px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border-4 border-blue-500 dark:border-indigo-500 transition-all"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-indigo-700 dark:to-indigo-900 text-white font-bold text-2xl relative">
          <span className="text-2xl md:text-3xl">💬 Chat en vivo</span>
          <button
            onClick={close}
            className="text-white text-3xl md:text-4xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-green-100 text-black self-end dark:bg-green-600 dark:text-white"
                  : "bg-blue-100 text-black self-start dark:bg-indigo-700 dark:text-white"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded-xl max-w-[80%] bg-indigo-100 text-black self-start dark:bg-indigo-800 dark:text-white">
              <span className="loader">...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex p-4 gap-2 border-t border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Escribe tu mensaje..."
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-indigo-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 dark:bg-indigo-500 text-white rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-indigo-600 transition disabled:opacity-70"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
