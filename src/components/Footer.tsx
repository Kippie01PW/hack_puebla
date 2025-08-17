"use client"
import React from 'react';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image'  
import { Link } from 'lucide-react';

function Modal({ children, onClose }: { children: React.ReactNode; onClose(): void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className="absolute inset-0 bg-gray bg-opacity-30 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Cerrar modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-1000 p-8 mx-4 max-w-lg w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
function PrivacyContent() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Política de Privacidad</h2>
      <p className="text-gray-700 dark:text-gray-300 text-justify">
        Seguridad en el Inicio de Sesión
        Al registrarte o iniciar sesión en nuestra plataforma, tu autenticación se establece mediante canales cifrados TLS (HTTPS), garantizando que toda información viaja de forma segura entre tu navegador y nuestros servidores.
        Las contraseñas nunca se almacenan en texto plano: aplicamos algoritmos de hashing robustos (bcrypt) junto con salting único por usuario, de modo que incluso si existiera un acceso no autorizado a la base de datos, no sería posible reconstruir tus credenciales originales.
        Almacenamiento de Información en Supabase
        Toda la información de usuario incluyendo datos de perfil, preferencias y tokens de sesión—se guarda en Supabase, una solución de base de datos en la nube que ofrece:
        </p>
        <br />
        <ul className='list-disc'>
        <li>Cifrado en reposo y en tránsito, con claves gestionadas por la propia plataforma.</li>
        <li>Backups automáticos diarios y replicación geográfica para alta disponibilidad.</li>
        </ul>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Términos y Condiciones</h2>
      <p className="text-gray-700 dark:text-gray-300">
        1. Aceptación de los términos
        Al acceder y utilizar nuestra plataforma, aceptas quedar vinculado por estos términos y condiciones.
        Si no estás de acuerdo con alguna disposición aquí contenida, te rogamos no usar nuestro sitio web ni los servicios asociados.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        2. Registro y cuentas de usuario
        Para disfrutar de ciertas funcionalidades es necesario crear una cuenta.
        - Eres responsable de mantener la confidencialidad de tus credenciales.
        - Debes proporcionar información veraz y actualizada en todo momento.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        3. Uso permitido de la plataforma
        Nuestro servicio está diseñado para uso personal y familiar.
        Queda prohibido emplear la plataforma con fines ilícitos o que infrinjan derechos de terceros.
      </p>
    </>
  );
}

const Footer = () => {
    const [openModal, setOpenModal] = useState<null | 'privacy' | 'terms'>(null);
  return (

<footer className="bg-white dark:bg-slate-950">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                  <div className="relative w-12 aspect-square">
                    <Image
                        src="/images/LogoCiberKidsLight.webp"
                        alt="CiberKids logo claro"
                        fill
                        className="object-contain block dark:hidden"
                    />
                    <Image
                        src="/images/LogoCiberKidsDark.webp"
                        alt="CiberKids logo oscuro"
                        fill
                        className="object-contain hidden dark:block"
                    />
                    </div>
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CiberKids</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Recursos</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="/extension-download" className="hover:underline">Extensión</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Síguenos</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="https://github.com/Kippie01PW/hack_puebla" className="hover:underline ">Github</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                    <button
                        className="hover:underline focus:outline-none"
                        onClick={() => setOpenModal('privacy')}
                    >
                        Política de privacidad
                    </button>
                    </li>
                    <li>
                    <button
                        className="hover:underline focus:outline-none"
                        onClick={() => setOpenModal('terms')}
                    >
                        Términos y condiciones
                    </button>
                    </li>
                </ul>
                {openModal === 'privacy' && (
                    <Modal onClose={() => setOpenModal(null)}>
                    <PrivacyContent />
                    </Modal>
                )}
                {openModal === 'terms' && (
                    <Modal onClose={() => setOpenModal(null)}>
                    <TermsContent />
                    </Modal>
                )}
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" className="hover:underline">CiberKids</a>. Todos los derechos reservados.
          </span>
      </div>
    </div>
</footer>

  );
};

export default Footer;