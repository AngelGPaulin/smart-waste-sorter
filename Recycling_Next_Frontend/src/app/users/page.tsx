"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";

export default function UsersPage() {
  const [form, setForm] = useState({
    userId: uuidv4(),
    name: "",
    email: "",
    rewardPoints: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "rewardPoints" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/users", form);
      alert("✅ Usuario creado con éxito");
      setForm({
        ...form,
        name: "",
        email: "",
        rewardPoints: 0,
        userId: uuidv4(),
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error al crear usuario");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="bg-zinc-800 p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🧍 Crear Usuario
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="ejemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Puntos</label>
            <input
              type="number"
              name="rewardPoints"
              value={form.rewardPoints}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0"
              min={0}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            Guardar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
