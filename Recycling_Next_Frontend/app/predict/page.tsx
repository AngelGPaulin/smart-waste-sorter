"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function PredictPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [prediction, setPrediction] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [selectedCorrectCategory, setSelectedCorrectCategory] = useState("");
  const [feedbackSent, setFeedbackSent] = useState<boolean | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Habilitar cámara al montar el componente
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("❌ Error accediendo a la cámara:", err));
  }, []);

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

  const captureFromWebcam = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
        setImage(file);
        setPreview(URL.createObjectURL(blob));
        setPrediction("");
        setShowCorrection(false);
        setFeedbackSent(null);
      }
    }, "image/jpeg");
  };

  const classifyImage = async () => {
    if (!image) {
      console.warn("⚠️ No se seleccionó ninguna imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch (err: any) {
      console.error("❌ Error al hacer la petición:", err);
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
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        ♻️ Clasificador Inteligente
      </h1>

      <div className="flex flex-col items-center gap-4">
        <video
          ref={videoRef}
          autoPlay
          width={300}
          height={225}
          className="border rounded-lg shadow"
        />
        <button
          onClick={captureFromWebcam}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          📷 Capturar desde webcam
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block mx-auto file:bg-green-600 file:text-white file:rounded file:px-4 file:py-2"
        />
      </div>

      <canvas
        ref={canvasRef}
        width={150}
        height={150}
        style={{ display: "none" }}
      />

      {preview && (
        <Image
          src={preview}
          alt="Vista previa"
          width={300}
          height={300}
          className="mx-auto mt-4 rounded-lg shadow"
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
          </div>
        </div>
      )}
    </div>
  );
}
