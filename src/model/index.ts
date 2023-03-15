import * as tf from "@tensorflow/tfjs";
import { POKEMON_LABELS } from "./pokemonLabels";

export const handlePrediction = async (base64String: string) => {
  const model = await tf.loadGraphModel(
    "https://raw.githubusercontent.com/Jawny/pokemon-cnn/master/server/src/static/tfjs/model.json"
  );
  const image = new Image();
  image.src = base64String;
  image.width = 300;
  image.height = 300;
  // TODO: issue with image akways spitting out 115. print out image later to check if it's correct.
  const tensor = tf.browser.fromPixels(image).expandDims(0).cast("float32");
  const result = (model.predict(tensor) as tf.Tensor).argMax(1).arraySync();
  console.log(result);
  return image;
};
