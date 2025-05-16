"use client";
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi'; // Importamos un ícono de flecha

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Botón de regreso - Agregado aquí */}
        <Link 
          href="/dashboard/home" 
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Volver al inicio
        </Link>

        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Reportes</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Generar Nuevo Reporte
          </button>
        </div>

        {/* Listado de reportes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3, 4, 5, 6].map((report) => (
            <div 
              key={report}
              className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">Reporte Mensual #{report}</h3>
              <p className="text-gray-400 text-sm mb-4">Generado el {new Date().toLocaleDateString()}</p>
              <div className="flex space-x-3">
                <Link 
                  href={`/dashboard/reports/${report}`}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Ver Detalles
                </Link>
                <button className="text-gray-400 hover:text-gray-300 text-sm">
                  Descargar PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de reportes */}
        <div className="bg-white bg-opacity-10 rounded-xl p-6 h-96 backdrop-blur-sm border border-white border-opacity-10 flex items-center justify-center">
          <p className="text-gray-400">Visualización de reportes</p>
        </div>
      </div>
    </div>
  );
}