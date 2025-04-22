"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { TOKEN_NAME } from "@/constants";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-yellow-400 text-white px-4">
      <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>

      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
        className="border p-2 mb-3 rounded w-full max-w-xs text-black"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="border p-2 mb-4 rounded w-full max-w-xs text-black"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Entrar
      </button>
    </main>
  );
}
