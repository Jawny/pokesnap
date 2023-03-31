import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { PokemonDataContext } from "../../contexts";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

const PokemonModal = ({ isOpen, onClose, name }: PokemonModalProps) => {
  const { handleAddPokemon, pokemonData } = useContext(PokemonDataContext);

  useEffect(() => {
    if (isOpen && !pokemonData[name.toLowerCase()]) {
      handleAddPokemon(name);
    }
  }, [isOpen]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonModal>
  );
};

export default PokemonModal;
