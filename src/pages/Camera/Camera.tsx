import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
} from "@ionic/react";
import { usePhotoGallery } from "./usePhotoGallery";
import { PhotoView } from "./index";
import "./Camera.css";

const Camera: React.FC = () => {
  const { takePhoto } = usePhotoGallery();
  const [cameraOnStatus, setCameraOnStatus] = useState(false);

  const CameraView = () => {
    useEffect(() => {
      takePhoto();
      setCameraOnStatus(false);
    }, []);
    return <></>;
  };

  return <>{cameraOnStatus ? <CameraView /> : <PhotoView />}</>;
};

export default Camera;
