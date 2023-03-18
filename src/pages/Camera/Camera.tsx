import React, { useState, useEffect, useContext } from "react";
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
  useIonViewWillEnter,
} from "@ionic/react";
import { usePhotoGallery } from "./usePhotoGallery";
import { PhotoView } from "./index";
import "./Camera.css";

const CameraView = () => {
  return <PhotoView />;
};

export default CameraView;
