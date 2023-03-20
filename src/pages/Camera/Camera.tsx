import { useState, useEffect, useRef } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonButton, IonContent, IonImg, IonPage } from "@ionic/react";
import { handleInference } from "../../model";
import { getPokemonArt, getPokemonByName } from "../../utils/pokeApi";

function CameraComponent() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [photoRetake, setPhotoRetake] = useState<boolean>(false);
  const [pokemonPrediction, setPokemonPrediction] = useState<string>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const cameraLoaded = useRef(false);

  const handlePrediction = async (photo: string) => {
    setLoading(true);
    const pokemonPrediction = await handleInference(photo);
    setPokemonPrediction(pokemonPrediction);
    const res = await getPokemonByName(pokemonPrediction);
    const pokeImage = await getPokemonArt(pokemonPrediction);
    setPokemonImage(pokeImage ?? "");
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
    <>
      {photo ? (
        <IonPage>
          <IonContent>
            <IonImg src={photo} alt="Captured Photo" />
            <IonImg src={pokemonImage} alt="pokemon img" />
            <IonButton disabled={loading} onClick={handlePhotoRetake}>
              retake Photo
            </IonButton>
            <IonButton
              disabled={loading}
              onClick={() => handlePrediction(photo)}
            >
              Analyze Pokemon
            </IonButton>
          </IonContent>
          <>
            {loading ? <p>Processing Photo...</p> : <p>{pokemonPrediction}</p>}
          </>
        </IonPage>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CameraComponent;
