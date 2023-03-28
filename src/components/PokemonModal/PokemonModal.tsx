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
import { PokemonDataContext, PokemonDataProvider } from "../../contexts";
import {
  getPokemonByName,
  formatAllAbilities,
  formatAllStats,
  formatAllTypes,
} from "../../utils";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

// create useMemo to cache data from api call to pokemon.
// Do this per modal open that way you only need to make api calls when it's open.
const PokemonModal = ({ isOpen, onClose, name }: PokemonModalProps) => {
  const { pokemonData, updatePokemonData } = useContext(PokemonDataContext);

  // useEffect(() => {
  //   const handleAddPokemon = async () => {
  //     const formattedPokemonName = name.toLowerCase();

  //     if (!pokemonData.hasOwnProperty(formattedPokemonName) && isOpen) {
  //       const fetchedPokemonData = await getPokemonByName(formattedPokemonName);

  //       if (fetchedPokemonData != null) {
  //         const { abilities, name, height, weight, stats, types } =
  //           fetchedPokemonData;
  //         const formattedAbilities = formatAllAbilities(abilities);
  //         const formattedStats = formatAllStats(stats);
  //         const formattedTypes = formatAllTypes(types);
  //         const newPokemon = {
  //           name,
  //           height,
  //           stats: formattedStats,
  //           abilities: formattedAbilities,
  //           types: formattedTypes,
  //           weight,
  //         };
  //         updatePokemonData(newPokemon.name, newPokemon);
  //       }
  //     }
  //   };

  //   handleAddPokemon();
  // }, [isOpen]);

  // const cachedPokemonData = useMemo(() => {
  //   const formattedPokemonName = name.toLowerCase();
  //   console.log(pokemonData);
  //   // return pokemonData[formattedPokemonName];
  // }, [pokemonData]);

  // useEffect(() => {
  //   const handleAddPokemon = async () => {
  //     const formattedPokemonName = name.toLowerCase();

  //     if (!pokemonData.hasOwnProperty(formattedPokemonName) && isOpen) {
  //       const fetchedPokemonData = await getPokemonByName(formattedPokemonName);

  //       if (fetchedPokemonData != null) {
  //         const { abilities, name, height, weight, stats, types } =
  //           fetchedPokemonData;
  //         const formattedAbilities = formatAllAbilities(abilities);
  //         const formattedStats = formatAllStats(stats);
  //         const formattedTypes = formatAllTypes(types);
  //         // console.log("pokemon data: ", fetchedPokemonData);
  //         const newPokemon = {
  //           name,
  //           height,
  //           stats: formattedStats,
  //           abilities: formattedAbilities,
  //           types: formattedTypes,
  //           weight,
  //         };
  //         updatePokemonData(newPokemon.name, newPokemon);
  //       }
  //     }
  //   };

  //   handleAddPokemon();
  // }, [isOpen]);

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
