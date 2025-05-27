"use client";
import axios from "axios";
import { API_URL } from "@/constants";
import LastPrediction from "@/components/LastPrediction";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Feedback {
  predictedClass: string;
}

export default async function ResultPage() {
  let prediction = null;
  const router = useRouter();
  try {
    const res = await axios.get(`${API_URL}/feedback/latest`);
    prediction = res.data.predictedClass;
    useEffect(() => {
      router.refresh();
    }, [prediction]);
  } catch (error) {
    console.error("Error al obtener la predicción:", error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      {prediction ? (
        <LastPrediction prediction={prediction} />
      ) : (
        <p className="text-red-500">No hay predicción disponible.</p>
      )}
    </div>
  );
}
