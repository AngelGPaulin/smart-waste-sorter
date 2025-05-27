"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const carouselImages = [
  "/img/Comercial1.jpg",
  "/img/Comercial2.jpg",
  "/img/Comercial3.jpg",
  "/img/Comercial4.jpg",
];

export default function DashboardHomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Políticas y Contacto", path: "/dashboard/Contacto" },
    { name: "Galería", path: "/dashboard/galeria" },
    { name: "Predicción", path: "/predict" },
    { name: "Estadísticas", path: "/dashboard/estadistics" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Barra de navegación mejorada */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 text-white z-50 shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo con efecto */}
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-white text-green-600 px-3 py-1 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                QroS
              </div>
            </div>

            {/* Menú de navegación mejorado */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="relative px-4 py-2 font-medium rounded-lg hover:bg-green-500 transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}
            </nav>

            {/* Menú hamburguesa para móviles */}
            <button className="md:hidden p-2 rounded-lg hover:bg-green-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Carrusel de comerciales */}
      <main className="pt-16 flex flex-col items-center justify-center w-full h-screen">
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={carouselImages[currentSlide]}
            alt={`Comercial ${currentSlide + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
        </div>

        {/* Bolitas para navegar entre comerciales */}
        <div className="absolute bottom-8 flex space-x-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
