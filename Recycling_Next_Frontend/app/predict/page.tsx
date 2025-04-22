"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function PredictPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [prediction, setPrediction] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [selectedCorrectCategory, setSelectedCorrectCategory] = useState("");
  const [feedbackSent, setFeedbackSent] = useState<boolean | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction("");
      setShowCorrection(false);
      setFeedbackSent(null);
    }
  };

  const classifyImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("❌ Error al clasificar la imagen");
    }
  };

  const sendFeedback = async ({
    imageUrl,
    predictedClass,
    correct,
    correctedLabel,
  }: {
    imageUrl: string;
    predictedClass: string;
    correct: boolean;
    correctedLabel?: string;
  }) => {
    try {
      await axios.post("http://localhost:4000/feedback", {
        imageUrl,
        predictedClass,
        isCorrect: correct,
        correctedLabel,
      });

      alert("✅ ¡Gracias por tu retroalimentación!");

      setImage(null);
      setPreview("");
      setPrediction("");
      setShowCorrection(false);
      setSelectedCorrectCategory("");
    } catch (err) {
      console.error(err);
      alert("❌ Error al enviar feedback");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 text-center p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-4 flex justify-center items-center gap-2">
        ♻️ Clasificador Inteligente
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block mx-auto mb-4 file:bg-green-600 file:text-white file:rounded file:px-4 file:py-2"
      />

      {preview && (
        <Image
          src={preview}
          alt="Vista previa"
          width={300}
          height={300}
          className="mx-auto rounded-lg shadow-md"
        />
      )}

      <button
        onClick={classifyImage}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
      >
        Clasificar
      </button>

      {prediction && (
        <div className="mt-6">
          <p className="text-lg font-semibold text-green-700">
            Predicción: <span className="font-bold">{prediction}</span>
          </p>

          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex gap-4">
              <button
                onClick={() =>
                  sendFeedback({
                    imageUrl: preview,
                    predictedClass: prediction,
                    correct: true,
                  })
                }
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
              >
                ✅ Adivinó bien
              </button>

              <button
                onClick={() => setShowCorrection(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
              >
                ❌ No es correcto
              </button>
            </div>

            {showCorrection && (
              <div className="flex flex-col gap-2 items-center">
                <select
                  onChange={(e) => setSelectedCorrectCategory(e.target.value)}
                  className="border p-2 rounded w-60"
                >
                  <option value="">Selecciona la categoría correcta</option>
                  <option value="plastic">Plástico</option>
                  <option value="glass">Vidrio</option>
                  <option value="metal">Metal</option>
                  <option value="paper">Papel</option>
                  <option value="organic">Orgánico</option>
                  <option value="trash">Basura</option>
                  <option value="electronic">Electrónico</option>
                  <option value="tetrapak">Tetrapak</option>
                  <option value="cardboard">Cartón</option>
                  <option value="battery">Batería</option>
                </select>

                <button
                  onClick={() =>
                    sendFeedback({
                      imageUrl: preview,
                      predictedClass: prediction,
                      correct: false,
                      correctedLabel: selectedCorrectCategory,
                    })
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Enviar corrección
                </button>
              </div>
            )}

            {feedbackSent !== null && (
              <p
                className={`mt-2 font-semibold ${
                  feedbackSent ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedbackSent
                  ? "✅ ¡Gracias por tu retroalimentación!"
                  : "❌ Error al enviar el feedback"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
