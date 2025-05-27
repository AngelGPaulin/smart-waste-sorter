"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    userId: "",
    name: "",
    email: "",
    rewardPoints: 0,
    password: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      userId: uuidv4(),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rewardPoints" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("DATA A ENVIAR", form);
      await api.post("/auth/register", form, {
        withCredentials: true,
      });

      alert("Usuario creado con éxito. Inicia sesión.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Error al registrar usuario");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-amber-600 text-white px-4">
      <h1 className="text-2xl font-bold mb-6">Crear Cuenta</h1>

      <input
        name="userId"
        value={form.userId}
        readOnly
        className="border p-2 mb-3 rounded w-full max-w-xs bg-gray-300 text-black"
      />

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="border p-2 mb-3 rounded w-full max-w-xs text-black"
      />

      <input
        name="email"
        placeholder="Correo"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 mb-3 rounded w-full max-w-xs text-black"
      />

      <input
        name="password"
        placeholder="Contraseña"
        type="password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 mb-3 rounded w-full max-w-xs text-black"
      />

      <input
        name="rewardPoints"
        type="number"
        placeholder="Puntos"
        value={form.rewardPoints}
        onChange={handleChange}
        className="border p-2 mb-4 rounded w-full max-w-xs text-black"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Registrarse
      </button>
    </main>
  );
}
