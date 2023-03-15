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
import "./Camera.css";

const PhotoView: React.FC = () => {
  const { photos } = usePhotoGallery();
  const [cameraOnStatus, setCameraOnStatus] = useState(false);

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PhotoView;
