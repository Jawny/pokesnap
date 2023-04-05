import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { handleInference } from "../../model";
import { getPokemonArt, getPokemonByName, handleSavePhoto } from "../../utils";
import "./Camera.scss";

function CameraComponent() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [photoRetake, setPhotoRetake] = useState<boolean>(false);
  const [pokemonPrediction, setPokemonPrediction] = useState<string | null>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const history = useHistory();
  const cameraLoaded = useRef(false);

  const handlePrediction = async (photo: string) => {
    setLoading(true);
    const pokemonPrediction = await handleInference(photo);

    if (pokemonPrediction != null) {
      setPokemonPrediction(pokemonPrediction);
      const res = await getPokemonByName(pokemonPrediction);
      const pokeImage = await getPokemonArt(pokemonPrediction);
      setPokemonImage(pokeImage ?? "");
      console.log("pokeapi: ", res);

      const originalImageData = await fetch(photo);
      const blob = await originalImageData.blob();
      await handleSavePhoto(blob, pokemonPrediction);
    }
    // TODO: Create toast message to have user retry
    setLoading(false);
  };

  const handlePhotoRetake = () => {
    cameraLoaded.current = false;
    setPhotoRetake(!photoRetake);
  };

  const takePhoto = async () => {
    try {
      return await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
    } catch (error: any) {
      if (error.message === "User cancelled photos app") {
        // Handle the case where the user cancelled the photo taking process
        history.push("/pokedex");
      } else {
        // Handle other errors here
        console.error(error);
      }
    }
  };

  useEffect(() => {
    async function getPhoto() {
      if (!cameraLoaded.current) {
        cameraLoaded.current = true;
        const image = await takePhoto();
        setPhoto(image?.webPath ?? null);
      }
    }
    getPhoto();
  }, [photoRetake]);

  return (
    <IonPage>
      {photo ? (
        <>
          <IonContent>
            <IonGrid>
              <IonRow className="ion-justify-content-center ion-margin">
                <IonImg
                  className="taken-photo"
                  src={photo}
                  alt="Captured Photo"
                />
              </IonRow>
              {pokemonImage ? (
                <>
                  <IonRow className="ion-justify-content-center ion-margin">
                    <IonImg
                      className="predicted-pokemon"
                      src={pokemonImage}
                      alt="pokemon img"
                    />
                  </IonRow>
                  <IonRow className="ion-justify-content-center ion-margin">
                    <IonTitle className="ion-text-center">
                      {pokemonPrediction}
                    </IonTitle>
                  </IonRow>
                </>
              ) : (
                <></>
              )}
              <>
                <IonRow className="ion-justify-content-center ion-margin">
                  <IonButton disabled={loading} onClick={handlePhotoRetake}>
                    retake Photo
                  </IonButton>
                  <IonButton
                    disabled={loading}
                    onClick={() => handlePrediction(photo)}
                  >
                    Analyze Pokemon
                  </IonButton>
                </IonRow>
              </>
            </IonGrid>
          </IonContent>
          <>{loading ? <IonProgressBar type="indeterminate" /> : <></>}</>
        </>
      ) : (
        <IonProgressBar type="indeterminate" />
      )}
    </IonPage>
  );
}

export default CameraComponent;
