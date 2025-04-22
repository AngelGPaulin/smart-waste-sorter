import { NextRequest, NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs-node';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Desactiva el parser de JSON
  },
};

let model: tf.GraphModel | null = null;
let labels: Record<number, string> = {};

// Cargar modelo y etiquetas una vez
const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('file://modelo/modelo_residuos/model.json');
    const raw = fs.readFileSync('modelo/labels.json', 'utf-8');
    labels = JSON.parse(raw);
  }
};

export async function POST(req: NextRequest) {
  await loadModel();

  const form = formidable({ multiples: false });
  const data: any = await new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const file = data.files.image;
  if (!file || !file.filepath) {
    return NextResponse.json({ error: 'No se encontró la imagen' }, { status: 400 });
  }

  const imageBuffer = fs.readFileSync(file.filepath);
  const tensor = tf.node
    .decodeImage(imageBuffer)
    .resizeNearestNeighbor([150, 150])
    .toFloat()
    .div(tf.scalar(255))
    .expandDims();

  const prediction = model!.predict(tensor) as tf.Tensor;
  const result = prediction.argMax(-1).dataSync()[0];

  return NextResponse.json({ prediction: labels[result] });
}
