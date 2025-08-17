"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Obtener usuario al cargar el componente
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    checkUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    if (error) console.error("Error al iniciar con Google:", error.message);
  };

  // Cerrar sesión
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const userAvatar = user?.user_metadata?.avatar_url;
  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";

  // Scroll a Artículos
  const goToArticles = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const section = document.getElementById("articles");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#articles");
    }
  };

  const goToChatbot = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);

    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        const url = new URL(window.location.href);
        url.searchParams.set("scroll", "chatbot");
        window.history.pushState({}, "", url.toString());
        const event = new Event("openChatbotFromNavbar");
        window.dispatchEvent(event);
      } else {
        router.push("/?scroll=chatbot");
      }
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-slate-950 p-5 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CiberKids
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Botón de usuario / login */}
          {user ? (
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8 rounded-full"
                src={userAvatar || "/default-avatar.png"}
                alt="user avatar"
              />
              <span className="text-gray-800 dark:text-white">{userName}</span>
              <button
                onClick={signOut}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Iniciar sesión con Google
            </button>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center justify-between w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-row font-medium gap-x-6">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
              >
                Inicio
              </Link>
            </li>
            <li>
              <a
                href="#articles"
                onClick={goToArticles}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
              >
                Artículos
              </a>
            </li>
            <li>
              <Link
                href="/acerca-de"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
              >
                Acerca de
              </Link>
            </li>
            <li>
              <a
                href="#chatbot"
                onClick={goToChatbot}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
              >
                ChatBot
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-gray bg-opacity-30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            />
            <motion.div
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 p-8 mx-4 max-w-sm w-full text-center"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>

              <ul className="flex flex-col items-center gap-6 mt-8">
                <li>
                  <Link
                    href="/"
                    className="block text-lg font-semibold text-black border-b border-blue-700 dark:border-emerald-300 px-6 py-3 dark:text-white hover:text-blue-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    CiberKids
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block text-lg font-semibold text-blue-600 hover:text-blue-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <a
                    href="#articles"
                    onClick={goToArticles}
                    className="block text-lg text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    Artículos
                  </a>
                </li>
                <li>
                  <Link
                    href="/acerca-de"
                    className="block text-lg text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    Acerca de
                  </Link>
                </li>
                <li>
                  <a
                    href="#quicklinks-chatbot"
                    onClick={goToChatbot}
                    className="block text-lg text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    ChatBot
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
