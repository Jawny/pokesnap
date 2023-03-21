import React, { useContext, useEffect, useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { PokemonDataContext, PokemonDataProvider } from "../../contexts";
import { getPokemonByName } from "../../utils";
import { Pokemon } from "pokeapi-js-wrapper";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

// create useMemo to cache data from api call to pokemon.
// Do this per modal open that way you only need to make api calls when it's open.
const PokemonModal = ({ isOpen, onClose, name }: PokemonModalProps) => {
  const { pokemonData, updatePokemonData } = useContext(PokemonDataContext);

  useEffect(() => {
    const handleAddPokemon = async () => {
      const formattedPokemonName = name.toLowerCase();

      if (!pokemonData.hasOwnProperty(formattedPokemonName) && isOpen) {
        const fetchedPokemonData = await getPokemonByName(formattedPokemonName);

        if (fetchedPokemonData != null) {
          const { name, height, weight, types } = fetchedPokemonData;
          console.log("pokemon data: ", fetchedPokemonData);
          // const newPokemon = { name, height };
          // updatePokemonData(newPokemon.name, newPokemon);
        }
      }
    };

    handleAddPokemon();
  }, [isOpen]);

  return (
    <PokemonDataProvider>
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
    </PokemonDataProvider>
  );
};

export default PokemonModal;
