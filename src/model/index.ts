import * as tf from "@tensorflow/tfjs";
import { POKEMON_LABELS } from "./pokemonLabels";

export const handleInference = async (webPath: string) => {
  const model = await tf.loadGraphModel(
    "https://raw.githubusercontent.com/Jawny/pokemon-cnn/master/server/src/static/tfjs/model.json"
  );
  const image = new Image();
  image.src = webPath;
  await image.decode();
  console.log("webpath:", webPath);

  // Preprocess the image
  const tensor = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([300, 300])
    .toFloat()
    .expandDims();

  // Perform Inference
  const result: any = await (model.predict(tensor) as tf.Tensor)
    .argMax(1)
    .arraySync();
  console.log("infernce res:", POKEMON_LABELS[result[0]]);
  return POKEMON_LABELS[result[0]];
};
