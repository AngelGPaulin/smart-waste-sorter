"use client";

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Botón de regreso */}
        <Link 
          href="/dashboard/home" 
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Volver al dashboard
        </Link>

        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Políticas y Lineamientos</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Normativas y guías para el correcto uso de la plataforma y procesos de reciclaje
          </p>
        </div>

        {/* Contenido principal */}
        <div className="bg-white bg-opacity-10 rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-white border-opacity-10">
          {/* Sección 1 */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Política de Privacidad</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                En cumplimiento con la Ley de Protección de Datos, garantizamos la confidencialidad de toda la información proporcionada por nuestros usuarios.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Los datos personales se utilizan exclusivamente para fines de operación del servicio</li>
                <li>No compartimos información con terceros sin consentimiento explícito</li>
                <li>Implementamos medidas de seguridad de última generación</li>
              </ul>
            </div>
          </div>

          {/* Sección 2 */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">2. Lineamientos de Reciclaje</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Para garantizar la eficiencia de nuestro proceso, seguimos los siguientes lineamientos:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Separación de materiales', content: 'Clasificar según tipo de material (plástico, vidrio, papel, etc.)' },
                  { title: 'Limpieza básica', content: 'Enjuagar envases para evitar residuos orgánicos' },
                  { title: 'Horarios de entrega', content: 'Lunes a viernes de 8:00 a 18:00 hrs' },
                  { title: 'Materiales aceptados', content: 'Consulta nuestra lista completa de materiales reciclables' }
                ].map((item, index) => (
                  <div key={index} className="bg-white bg-opacity-5 p-4 rounded-lg border border-white border-opacity-5">
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sección 3 */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">3. Términos de Servicio</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Al utilizar nuestra plataforma, aceptas los siguientes términos:
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Uso responsable de la plataforma</li>
                <li>Prohibición de actividades ilegales o fraudulentas</li>
                <li>Responsabilidad sobre la veracidad de la información proporcionada</li>
                <li>Compromiso con las prácticas de reciclaje sustentables</li>
              </ol>
            </div>
          </div>

          {/* Botón de aceptación */}
          <div className="flex justify-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition-colors">
              Aceptar Políticas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}