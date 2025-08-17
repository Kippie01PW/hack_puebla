"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
	{
		src: "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460062/imagenhero1_qf1yxk.png",
		title: "Principales riesgos en línea",
		desc: "El 50 % se enfrenta a contenido inapropiado o engañoso, el 34.5 % al contacto con extraños y el 20.3 % al ciberacoso.",
	},
	{
		src: "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460249/imagenhero2_kud6uz.png",
		title: "“Protege su primer click”",
		desc: "Cada acción en línea cuenta, y su seguridad también.",
	},
	{
		src: "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460315/imagenhero3_trec1x.png",
		title: "“Navegar no debería asustar” – El conocimiento es la mejor protección.",
		desc: "La orientación temprana reduce riesgos en línea y fomenta hábitos digitales seguros.",
	},
	{
		src: "https://res.cloudinary.com/dkcpqgkkc/image/upload/v1755460437/imagenhero4_wpg1mc.png",
		title: "100% control sin perder diversión",
		desc: "Una extensión, un chat y consejos claros: la guía que tu hijo necesita para navegar tranquilo.",
	},
];

export default function ProductHero() {
	const [active, setActive] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const [isDark, setIsDark] = useState(false);

	const prevSlide = () =>
		setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	const nextSlide = () =>
		setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	const goToSlide = (idx: number) => setActive(idx);

	// Auto-slide cada 3 segundos
	useEffect(() => {
		const interval = setInterval(nextSlide, 3000);
		return () => clearInterval(interval);
	}, []);

	// Detecta si es móvil (solo en cliente)
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 640);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Detecta modo oscuro (solo en cliente)
	useEffect(() => {
		const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
		const updateDark = () => setIsDark(matchDark.matches);
		updateDark();
		matchDark.addEventListener("change", updateDark);
		return () => matchDark.removeEventListener("change", updateDark);
	}, []);

	// Determina el color de fondo del polígono/overlay
	const overlayBg = isMobile
		? isDark
			? "rgba(17, 24, 39, 0.8)" // móvil oscuro
			: "rgba(163, 190, 214, 0.8)" // móvil claro
		: isDark
			? "#111827" // desktop oscuro
			: "#A3BED6"; // desktop claro

	return (
		<div
			className="relative w-full mx-auto rounded-3xl overflow-hidden shadow-xl"
			id="hero"
		>
			<div className="relative h-64 sm:h-80 md:h-[32rem] w-full">
				{/* Imagen de fondo */}
				<Image
					src={slides[active].src}
					alt={`Slide ${active + 1}`}
					fill
					className="object-cover"
					priority
				/>

				{/* Overlay poligonal en desktop, fondo translúcido en móvil */}
				<div
					className={`absolute left-0 top-0 h-full 
            w-full sm:w-[80%] md:w-[75%] 
            flex flex-col justify-center items-start 
            p-4 sm:p-6 md:p-10 z-10 rounded-2xl shadow-lg`}
					style={{
						clipPath: isMobile
							? "none"
							: "polygon(55% 0, 69% 49%, 55% 100%, 0 100%, 0 0)",
						background: overlayBg,
					}}
				>
					<div className="max-w-full sm:max-w-sm md:max-w-md ml-6 sm:ml-10 md:ml-16 text-left break-words">
						<h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-tight text-black dark:text-white">
							{slides[active].title}
						</h1>
						<p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base/6 opacity-90 text-black dark:text-white">
							{slides[active].desc}
						</p>
					</div>
				</div>

				{/* Controles: botones de flecha */}
				<div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 md:px-8 z-20">
					<button
						onClick={prevSlide}
						className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/60 shadow"
					>
						<svg
							className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-800"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<button
						onClick={nextSlide}
						className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/60 shadow"
					>
						<svg
							className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-800"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>

				{/* Indicadores */}
				<div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-4 sm:bottom-6 left-1/2">
					{slides.map((_, idx) => (
						<button
							key={idx}
							type="button"
							className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-blue-300 transition-all duration-200
      ${active === idx ? "bg-blue-600 shadow-lg scale-110" : "bg-white/60 backdrop-blur"}`}
							aria-current={active === idx}
							aria-label={`Slide ${idx + 1}`}
							onClick={() => goToSlide(idx)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}