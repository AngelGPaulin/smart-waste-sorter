"use client";

import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function EstadisticsPage() {
  const wasteData = [
    { name: "plastic", value: 24 },
    { name: "glass", value: 14 },
    { name: "metal", value: 9 },
    { name: "paper", value: 11 },
    { name: "trash", value: 4 },
    { name: "organico", value: 7 },
    { name: "electronic", value: 3 },
    { name: "tetrapak", value: 2 },
    { name: "battery", value: 5 },
    { name: "cardboard", value: 6 },
  ];

  const feedbackStats = [
    { name: "Aciertos", value: 68 },
    { name: "Errores", value: 12 },
  ];

  const trendData = [
    { day: "Lunes", plastic: 5, paper: 3 },
    { day: "Martes", plastic: 6, paper: 4 },
    { day: "Miércoles", plastic: 4, paper: 5 },
    { day: "Jueves", plastic: 7, paper: 6 },
    { day: "Viernes", plastic: 2, paper: 3 },
  ];

  const COLORS = [
    "#34d399",
    "#6ee7b7",
    "#10b981",
    "#4ade80",
    "#22c55e",
    "#86efac",
    "#16a34a",
    "#15803d",
    "#166534",
    "#14532d",
  ];

  return (
    <div className="min-h-screen p-10 bg-green-50 text-green-900">
      <Link
        href="/dashboard/home"
        className="inline-block mb-6 text-green-700 hover:underline text-sm"
      >
        ← Volver al Panel
      </Link>

      <h1 className="text-3xl font-bold mb-8">Estadísticas de Clasificación</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Distribución por Tipo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wasteData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {wasteData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Exactitud de Clasificación
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedbackStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Tendencia Semanal de Clasificación
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="plastic"
              stroke="#34d399"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="paper"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
