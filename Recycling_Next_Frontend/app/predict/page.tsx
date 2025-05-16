"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiUpload, FiCheck, FiX, FiSend } from "react-icons/fi";

export default function PredictPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [prediction, setPrediction] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [selectedCorrectCategory, setSelectedCorrectCategory] = useState("");
  const [feedbackSent, setFeedbackSent] = useState<boolean | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      setFeedbackSent(true);

      setTimeout(() => {
        setImage(null);
        setPreview("");
        setPrediction("");
        setShowCorrection(false);
        setSelectedCorrectCategory("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setFeedbackSent(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Botón de regreso */}
      <Link 
        href="/dashboard/home" 
        className="flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver al Panel
      </Link>

      {/* Contenedor principal */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Encabezado */}
        <div className="bg-green-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 flex justify-center items-center gap-3">
            ♻️ Clasificador Ecológico
          </h1>
          <p className="text-green-100">Sube una imagen para clasificar el tipo de material reciclable</p>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Uploader */}
          <div className="mb-8">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiUpload className="w-8 h-8 mb-3 text-green-600" />
                <p className="mb-2 text-sm text-gray-700">
                  <span className="font-semibold text-green-600">Haz clic para subir</span> o arrastra tu imagen
                </p>
                <p className="text-xs text-gray-500">Formatos: JPG, PNG (Max. 5MB)</p>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
          </div>

          {/* Vista previa */}
          {preview && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-green-200 shadow-sm">
                <Image
                  src={preview}
                  alt="Vista previa"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Botón de clasificación */}
          <button
            onClick={classifyImage}
            disabled={!preview}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              preview 
                ? "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg" 
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <FiCheck className="text-lg" />
            Clasificar Imagen
          </button>

          {/* Resultados */}
          {prediction && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Resultado de Clasificación</h3>
              
              <div className="bg-white p-4 rounded border border-green-200 mb-6">
                <p className="text-gray-600">El sistema ha identificado:</p>
                <p className="text-2xl font-bold text-green-600 capitalize mt-1">{prediction}</p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 font-medium">¿Es correcta esta clasificación?</p>
                
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() =>
                      sendFeedback({
                        imageUrl: preview,
                        predictedClass: prediction,
                        correct: true,
                      })
                    }
                    className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-lg border border-green-200 transition-colors"
                  >
                    <FiCheck className="text-green-600" /> Sí, es correcta
                  </button>

                  <button
                    onClick={() => setShowCorrection(true)}
                    className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg border border-red-200 transition-colors"
                  >
                    <FiX className="text-red-600" /> No, es incorrecta
                  </button>
                </div>

                {showCorrection && (
                  <div className="mt-4 space-y-4">
                    <select
                      onChange={(e) => setSelectedCorrectCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      disabled={!selectedCorrectCategory}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 ${
                        selectedCorrectCategory
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <FiSend /> Enviar Corrección
                    </button>
                  </div>
                )}

                {feedbackSent !== null && (
                  <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
                    feedbackSent 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {feedbackSent
                      ? "✅ ¡Gracias por tu retroalimentación! La página se actualizará en breve."
                      : "❌ Error al enviar el feedback. Por favor intenta nuevamente."}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
