interface Props {
  prediction: string;
}

export default function LastPrediction({ prediction }: Props) {
  return (
    <div className="bg-green-100 p-8 rounded-2xl shadow-lg border border-green-300 max-w-xl mx-auto text-center">
      <p className="text-3xl font-bold text-green-800">
        Predicción: <span className="text-black">{prediction}</span>
      </p>
    </div>
  );
}
