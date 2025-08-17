"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import type { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from 'framer-motion';
import {supabase} from '../../lib/supabaseClient';  


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);

  // Obtener el usuario al cargar el componente
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    // Escuchar cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

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
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`, // Ajusta si usas otro dominio
      },
    });
    if (error) console.error("Error al iniciar con Google:", error.message);
  };

  // Cerrar sesión
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Mostrar avatar o botón de login
  const userAvatar = user?.user_metadata?.avatar_url;
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  const userEmail = user?.email || "";

 
  

  return (
     <nav className="bg-white border-gray-200 dark:bg-slate-950 p-5 sticky top-0 z-98">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CiberKids</span>
        </Link>

        {/* Avatar o botón de login */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {loading ? (
            // Skeleton mientras carga
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          ) : user ? (
            <>
              {/* Avatar del usuario */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userAvatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(userName) + "&background=random"}
                  alt="User photo"
                />
              </button>

              {/* Dropdown del usuario */}
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{userName}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{userEmail}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Configuración
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={signOut}
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            // Botón para iniciar sesión con Google
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex items-center space-x-2 text-sm bg-blue-600 text-white rounded-full px-3 py-1.5 hover:bg-blue-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M22.56 12.25c0-.73-.06-1.44-.18-2.13H12v3.87h5.74c-.26 1.37-1.04 2.53-2.2 3.31v2.54h3.55c2.06-1.9 3.27-4.71 3.27-8.08z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.55-2.78c-.98.66-2.23 1.06-3.73 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.59 8.3 1.59 9.7 2.18 10.91v2.18h3.66z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Iniciar con Google</span>
            </button>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
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
        {/* Menú normal para desktop */}
        <div className="hidden md:flex items-center justify-between w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-row font-medium gap-x-6">
            <li>
              <Link href="/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Inicio</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Artículos</Link>
            </li>
            <li>
              <Link href="acerca-de" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Acerca de</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">ChatBot</Link>
            </li>
          </ul>
        </div>
      </div>

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
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-99 p-8 mx-4 max-w-sm w-full text-center"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
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
                <Link href="/" className="block text-lg font-semibold text-black border-b border-blue-700 dark:border-emerald-300 px-22 py-3 dark:text-white hover:text-blue-800" onClick={() => setMenuOpen(false)}>
                  CiberKids
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-lg font-semibold text-blue-600 hover:text-blue-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-lg text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Artículos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-lg text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-lg text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                  onClick={() => setMenuOpen(false)}
                >
                  ChatBot
                </Link>
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