import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
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
        </IonToolbar>
      </IonHeader>
      <IonContent>{content}</IonContent>
      <IonButton onClick={onClose}>Close Modal</IonButton>
    </IonModal>
  );
};

export default PokemonModal;
