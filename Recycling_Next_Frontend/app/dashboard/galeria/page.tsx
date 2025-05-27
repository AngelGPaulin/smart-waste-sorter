"use client";

import Image from "next/image";
import Link from "next/link";

const predictions = [
  { src: "/Img/Img1.jpg", label: "organico", correct: true },
  { src: "/Img/Img2.jpg", label: "plastic", correct: false },
  { src: "/Img/Img3.jpg", label: "glass", correct: true },
  { src: "/Img/Img4.jpg", label: "metal", correct: true },
  { src: "/Img/Img5.jpg", label: "trash", correct: false },
  { src: "/Img/Img6.jpg", label: "paper", correct: true },
];

export default function ImageReviewPage() {
  return (
    <div className="min-h-screen p-10 bg-green-50 text-green-900">
      <Link
        href="/dashboard/home"
        className="inline-block mb-6 text-green-700 hover:underline text-sm"
      >
        ← Volver al Panel
      </Link>

      <h1 className="text-3xl font-bold mb-8">Revisión de Imágenes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((img, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center"
          >
            <Image
              src={img.src}
              alt={`Imagen ${i + 1}`}
              width={200}
              height={200}
              className="rounded-md mb-3 object-cover"
            />
            <p className="font-medium">
              <strong>Predicción:</strong> {img.label}
            </p>
            <p
              className={
                img.correct
                  ? "text-green-600 font-semibold"
                  : "text-green-600 font-semibold"
              }
            >
              {img.correct ? "Acertada" : "Acertada"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
