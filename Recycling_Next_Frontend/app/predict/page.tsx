"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function PredictPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [prediction, setPrediction] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [selectedCorrectCategory, setSelectedCorrectCategory] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accediendo a la cámara:", err));

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction("");
      setShowCorrection(false);
    }
  };

  const captureFromWebcam = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Ajustar el canvas al tamaño del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar el frame actual del video en el canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir a blob y crear la vista previa
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "webcam-capture.jpg", {
            type: "image/jpeg",
          });
          setImage(file);
          setPreview(URL.createObjectURL(blob));
          setPrediction("");
          setShowCorrection(false);
        }
      },
      "image/jpeg",
      0.95
    ); // Calidad del 95%
  };

  const classifyImage = async () => {
    if (!image) {
      alert("Por favor, captura o sube una imagen primero");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/predict/gpt",
        formData
      );
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error("Error al clasificar:", err);
      alert("Error al clasificar la imagen");
    }
  };

  const sendFeedback = async (correct: boolean) => {
    try {
      await axios.post("http://localhost:4000/feedback", {
        imageUrl: preview,
        predictedClass: prediction,
        isCorrect: correct,
        correctedLabel: correct ? undefined : selectedCorrectCategory,
      });
      alert("✅ Feedback enviado");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("❌ Error al enviar feedback");
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview("");
    setPrediction("");
    setShowCorrection(false);
    setSelectedCorrectCategory("");
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/dashboard/home"
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <FiArrowLeft className="mr-2" />
            Volver
          </Link>
          <h1 className="text-xl font-bold text-green-700">
            ♻️ Clasificador Ecológico
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 overflow-hidden p-4 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Columna izquierda - Cámara */}
          <div className="flex flex-col h-full">
            <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-green-700 mb-3">
                Cámara
              </h2>

              <div className="flex-1 flex flex-col items-center justify-center relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto max-h-[60vh] object-contain border-2 border-green-300 rounded-lg"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={captureFromWebcam}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow transition flex items-center justify-center"
                >
                  Capturar imagen
                </button>

                <label className="cursor-pointer bg-white border-2 border-green-300 text-green-700 py-2 px-4 rounded-lg shadow hover:bg-green-50 transition flex items-center justify-center">
                  Subir imagen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Columna derecha - Vista previa */}
          <div className="flex flex-col h-full">
            <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100 flex-1 flex flex-col">
              {!preview ? (
                <div className="flex-1 flex flex-col items-center justify-center text-green-700">
                  <div className="text-5xl mb-4">🌿</div>
                  <h2 className="text-xl font-semibold mb-2">Vista previa</h2>
                  <p className="text-center">
                    Captura o sube una imagen para comenzar
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-green-700 mb-3">
                    Vista previa
                  </h2>
                  <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="max-h-[50vh] w-auto object-contain rounded-lg border-2 border-green-200"
                    />
                  </div>

                  <button
                    onClick={classifyImage}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow transition w-full"
                  >
                    Clasificar residuo
                  </button>
                </>
              )}
            </div>

            {/* Sección de resultados */}
            {prediction && (
              <div className="mt-4 bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-green-700 mb-2">
                    Resultado
                  </h2>
                  <p className="text-lg bg-white p-3 rounded border border-green-200">
                    <span className="font-semibold text-green-500">
                      Predicción:
                    </span>{" "}
                    <span className="font-bold text-green-800">
                      {prediction}
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-green-700 font-medium text-center">
                    ¿La clasificación es correcta?
                  </p>

                  <div className="flex space-x-3 justify-center">
                    <button
                      onClick={() => sendFeedback(true)}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow transition flex-1"
                    >
                      ✅ Sí
                    </button>
                    <button
                      onClick={() => setShowCorrection(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg shadow transition flex-1"
                    >
                      ❌ No
                    </button>
                  </div>
                </div>

                {showCorrection && (
                  <div className="mt-4 bg-white p-4 rounded-lg shadow border border-green-200">
                    <h3 className="font-semibold text-green-700 mb-3">
                      Corregir categoría
                    </h3>
                    <select
                      value={selectedCorrectCategory}
                      onChange={(e) =>
                        setSelectedCorrectCategory(e.target.value)
                      }
                      className="w-full p-2 border-2 border-green-300 rounded-lg mb-3"
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
                      onClick={() => sendFeedback(false)}
                      disabled={!selectedCorrectCategory}
                      className={`w-full py-2 px-4 rounded-lg shadow transition ${
                        selectedCorrectCategory
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Enviar corrección
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
