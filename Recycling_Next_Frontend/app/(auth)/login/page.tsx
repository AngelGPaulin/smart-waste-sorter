"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { TOKEN_NAME } from "@/constants";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navItems = [
    { name: 'Registro', path: '/signup' },
    { name: 'Entrar', path: '/login' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", form);
      console.log("RESPUESTA DEL BACKEND:", res.data);

      const { token } = res.data;

      Cookies.set(TOKEN_NAME, token, {
        expires: 10,
        path: "/",
      });

      alert("Sesión iniciada correctamente");
      router.push("/dashboard/home");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <main className="relative w-screen h-screen bg-gray-100 p-0 m-0 overflow-hidden flex flex-col">
      {/* Elementos de diseño amorfos (gotas de pintura) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/3 right-20 w-40 h-40 bg-green-50 rounded-full mix-blend-multiply opacity-30 blur-xl"></div>
        <div className="absolute top-2/3 left-1/4 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-100 rounded-full mix-blend-multiply opacity-25 blur-xl"></div>
      </div>

      {/* Contenedor del logo */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
      <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-white text-green-600 px-3 py-1 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                QroS
              </div>
            </div>
      </div>

      {/* Tabs centrados en la parte superior */}
      <div className="w-full flex justify-center pt-6 sm:pt-8 relative z-10">
        <nav className="flex space-x-6 border-b border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`pb-2 px-1 border-b-2 transition text-sm sm:text-base ${
                pathname === item.path
                  ? 'text-black font-medium border-green-500'
                  : 'text-gray-500 border-transparent hover:text-black hover:border-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Contenedor principal del formulario */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md bg-white sm:rounded-xl sm:shadow-xl sm:border sm:border-gray-200 p-8 sm:p-10 h-full sm:h-auto flex flex-col justify-center relative overflow-hidden">
          {/* Detalle de diseño dentro del contenedor */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-50 rounded-full mix-blend-multiply opacity-10 blur-xl"></div>
          
          {/* Encabezado */}
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-500">Ingresa tus credenciales para continuar</p>
          </div>
    
          <div className="space-y-6 relative z-10">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                placeholder="ejemplo@correo.com"
              />
            </div>
    
            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña*
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                placeholder="••••••••"
              />
            </div>
    
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow hover:shadow-md"
            >
              Continuar
            </button>
          </div>
    
          {/* Pie de formulario */}
          <div className="mt-8 text-center text-sm text-gray-500 relative z-10">
            ¿No tienes cuenta?{' '}
            <Link href="/signup" className="text-green-600 hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}