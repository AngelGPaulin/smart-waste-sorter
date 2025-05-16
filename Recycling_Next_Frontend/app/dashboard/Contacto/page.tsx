"use client";

import Link from 'next/link';
import { FiArrowLeft, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

export default function PoliticasPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto">
        {/* Botón de regreso */}
        <Link 
          href="/dashboard/home" 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al Panel
        </Link>

        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Políticas y Lineamientos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Normativas y guías para el uso correcto de nuestra plataforma ecológica
          </p>
        </div>

        {/* Tarjeta de contacto - Destacado en verde */}
        <div className="bg-green-200 hover:bg-green-10 rounded-xl p-6 mb-10 border border-green-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
            <FiMessageSquare className="mr-2 text-green-600" /> Contacto del Departamento de Sostenibilidad
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <FiMail className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Correo electrónico</p>
                <a href="mailto:sostenibilidad@ecoempresa.com" className="hover:text-green-600 transition-colors font-medium text-gray-900">
                  sostenibilidad@ecoempresa.com
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <FiPhone className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <a href="tel:+525512345678" className="hover:text-green-600 transition-colors font-medium text-gray-900">
                  +52 55 1234 5678
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                  <path d="M8.625.75A4.125 4.125 0 004.5 4.875v7.5c0 2.485 2.019 4.5 4.5 4.5h1.5v5.625a.75.75 0 01-1.28.53l-3.72-3.72H4.5A4.125 4.125 0 00.375 12.375v-7.5A4.125 4.125 0 014.5.75h4.125zM15.75 3.75a.75.75 0 01.75.75v3.75h3.75a.75.75 0 010 1.5H16.5v3.75a.75.75 0 01-1.5 0V9.75h-3.75a.75.75 0 010-1.5h3.75V4.5a.75.75 0 01.75-.75z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <a href="https://wa.me/525512345678" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors font-medium text-gray-900">
                  +52 55 9876 5432
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          {/* Sección 1 */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-green-600 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">1. Política Ambiental</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Nos comprometemos con prácticas sostenibles y protección del medio ambiente.
              </p>
              <ul className="space-y-3">
                {[
                  "Reducción de nuestra huella de carbono en todas las operaciones",
                  "Uso exclusivo de materiales reciclados y reciclables",
                  "Compensación del 200% de nuestras emisiones",
                  "Colaboración con comunidades locales para proyectos ecológicos"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-green-200 hover:bg-green-200 p-4 rounded-lg border border-green-100">
                <p className="font-medium text-gray-900 mb-2">Para reportes ambientales:</p>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <FiMail className="text-green-600" />
                  </div>
                  <a href="mailto:ambiente@ecoempresa.com" className="hover:text-green-600 font-medium text-gray-900">
                    ambiente@ecoempresa.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2 */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-green-600 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">2. Guías de Reciclaje</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Siga estas pautas para maximizar el impacto positivo de su reciclaje:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { 
                    title: 'Separación Inteligente', 
                    content: 'Clasifique por tipo de material y color para facilitar el proceso',
                    icon: '♻️'
                  },
                  { 
                    title: 'Preparación de Materiales', 
                    content: 'Limpie y seque los materiales antes de entregarlos',
                    icon: '🧼'
                  },
                  { 
                    title: 'Horarios Verdes', 
                    content: 'Lunes a sábado de 7:00 AM a 7:00 PM en nuestros centros',
                    icon: '⏱️'
                  },
                  { 
                    title: 'Materiales Premium', 
                    content: 'Recibimos materiales especiales con bonificación adicional',
                    icon: '⭐'
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors shadow-xs">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sección 3 */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-green-600 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">3. Compromiso Ecológico</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Al usar nuestros servicios, usted se compromete a:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <ol className="space-y-3 list-decimal list-inside">
                  {[
                    "Practicar el consumo responsable de recursos",
                    "Participar en nuestros programas de reciclaje comunitario",
                    "Reportar cualquier práctica anti-ecológica observada",
                    "Promover la conciencia ambiental en su comunidad"
                  ].map((item, index) => (
                    <li key={index} className="pl-2">
                      <span className="font-medium text-gray-900">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="text-gray-500 text-sm mt-3">
                * Incumplimientos reiterados pueden resultar en la suspensión del servicio
              </p>
            </div>
          </div>

          {/* Pie de página */}
{/* Pie de página */}
<div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4 border-t border-gray-200 pt-8">
  <p className="text-gray-600 text-sm text-center sm:text-left">
    ¿Tiene preguntas sobre nuestras políticas ecológicas?
  </p>
  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
    <button 
      className="bg-transparent hover:bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors border border-gray-300 flex items-center justify-center relative group"
      onMouseEnter={(e) => e.currentTarget.innerHTML = '<FiPhone className="mr-2" /> +52 55 1234 5678'}
      onMouseLeave={(e) => e.currentTarget.innerHTML = '<FiPhone className="mr-2" /> Soporte Ecológico'}
    >
      <FiPhone className="mr-2" />
      Soporte Ecológico
    </button>
    <button 
      onClick={() => window.location.href = '/dashboard/home'}
      className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow hover:shadow-md flex items-center justify-center"
    >
      Aceptar Compromiso Verde
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}