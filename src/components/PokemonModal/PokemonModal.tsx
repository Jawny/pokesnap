import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
} from "@ionic/react";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const PokemonModal = ({
  isOpen,
  onClose,
  title,
  content,
}: PokemonModalProps) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>{content}</IonContent>
    </IonModal>
  );
};

export default PokemonModal;
