import { useState, useEffect, useRef } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonButton, IonImg } from "@ionic/react";
import { handleInference } from "../../model";
import { getPokemonByName } from "../../utils/pokeApi";

function CameraComponent() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [photoRetake, setPhotoRetake] = useState<boolean>(false);
  const [pokemonPrediction, setPokemonPrediction] = useState<string>("");
  const cameraLoaded = useRef(false);

  const handlePrediction = async (photo: string) => {
    setLoading(true);
    const pokemonPrediction = await handleInference(photo);
    setPokemonPrediction(pokemonPrediction);
    const res = await getPokemonByName(pokemonPrediction);
    console.log("pokeapi: ", res);
    setLoading(false);
  };

  const handlePhotoRetake = () => {
    cameraLoaded.current = false;
    setPhotoRetake(!photoRetake);
  };

  const takePhoto = async () =>
    await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

  useEffect(() => {
    async function getPhoto() {
      if (!cameraLoaded.current) {
        cameraLoaded.current = true;
        const image = await takePhoto();
        setPhoto(image.webPath ?? null);
      }
    }
    getPhoto();
  }, [photoRetake]);

  return (
    <div>
      {photo ? (
        <>
          <IonImg src={photo} alt="Captured Photo" />
          <IonButton disabled={loading} onClick={handlePhotoRetake}>
            retake Photo
          </IonButton>
          <IonButton disabled={loading} onClick={() => handlePrediction(photo)}>
            Analyze Pokemon
          </IonButton>
          <>
            {loading ? <p>Processing Photo...</p> : <p>{pokemonPrediction}</p>}
          </>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CameraComponent;
