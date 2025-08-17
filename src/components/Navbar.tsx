"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-slate-950 p-5 sticky top-0 z-99">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CiberKids</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
      </button>

      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        {/* Menú normal para desktop */}
        <div className="hidden md:flex items-center justify-between w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-row font-medium gap-x-25">
            <li>
              <Link href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Inicio</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Artículos</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Acerca de</Link>
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

          {/* Modal centrado */}
          <motion.div
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 p-8 mx-4 max-w-sm w-full text-center"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Botón de cerrar */}
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