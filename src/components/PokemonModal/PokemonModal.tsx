import { useContext, useEffect, useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonImg,
  IonChip,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonLabel,
  IonText,
  IonCol,
} from "@ionic/react";
import { PokemonDataContext } from "../../providers";
import { IPokemon } from "../../providers/PokemonDataProvider/PokemonDataProviderInterfaces";
import "./PokemonModal.scss";
interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  imageUrl: string;
}

const currPokemonEmptyState = {
  name: "",
  height: 0,
  stats: [],
  abilities: [],
  types: [],
  weight: 0,
};

const PokemonModal = ({
  isOpen,
  onClose,
  name,
  imageUrl,
}: PokemonModalProps) => {
  const { handleAddPokemon, pokemonData } = useContext(PokemonDataContext);
  const [currPokemon, setCurrPokemon] = useState<IPokemon>(
    currPokemonEmptyState
  );

  useEffect(() => {
    (async () => {
      if (isOpen && !pokemonData[name.toLowerCase()]) {
        const currPokemon = await handleAddPokemon(name);
        if (currPokemon != null) {
          setCurrPokemon(currPokemon);
        }
      } else if (pokemonData[name.toLowerCase()]) {
        setCurrPokemon(pokemonData[name.toLowerCase()]);
      }
    })();
  }, [isOpen]);

  const populateStats = () => {
    const { stats } = currPokemon;
    const calculateStatValue = (statName: string, baseStat: number): number => {
      switch (statName) {
        case "hp":
          return baseStat / 255;
        case "attack":
          return baseStat / 190;
        case "defense":
          return baseStat / 230;
        case "special-attack":
          return baseStat / 194;
        case "special-defense":
          return baseStat / 230;
        case "speed":
          return baseStat / 180;
        default:
          return 0;
      }
    };
    const getStatText = (baseStat: number, statName: string): string => {
      switch (statName) {
        case "hp":
          return `${statName}: ${baseStat}/255`;
        case "attack":
          return `${statName}: ${baseStat}/190`;
        case "defense":
          return `${statName}: ${baseStat}/230`;
        case "special-attack":
          return `${statName}: ${baseStat}/194`;
        case "special-defense":
          return `${statName}: ${baseStat}/230`;
        case "speed":
          return `${statName}: ${baseStat}/180`;
        default:
          return "";
      }
    };

    const result = stats.map((stat) => {
      const { statName, baseStat } = stat;
      const baseStatValue = calculateStatValue(statName, baseStat);
      return (
        <div className={`stat-bar-container`}>
          <IonLabel className="stat-text" key={statName}>
            {getStatText(baseStat, statName)}
          </IonLabel>
          <IonProgressBar className={`${statName}-bar`} value={baseStatValue} />
        </div>
      );
    });

    return result;
  };

  const populateTypes = () => (
    <>
      {currPokemon.types.map((type) => (
        <IonChip className={`${type}-type`}>{type}</IonChip>
      ))}
    </>
  );

  const populateWeightAndHeight = () => (
    <>
      <IonText className=" ion-padding-start ion-padding-end">
        {`Height: ${currPokemon.height / 100} m`}
      </IonText>
      <IonText className="ion-padding-start ion-padding-end">
        {`Weight: ${currPokemon.weight} kg`}
      </IonText>
    </>
  );

  const populateAbilities = () => (
    <IonGrid className="ion-justify-content-center ion-align-items-center">
      <IonRow>
        {currPokemon.abilities.map((ability) => (
          <IonCol key={ability}>
            <IonText>{ability}</IonText>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );

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
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-margin">
            <IonImg className="pokemon-image" src={imageUrl} />
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin">
            {populateWeightAndHeight()}
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin">
            {populateTypes()}
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin">
            <IonText className="title-text">Base Stats</IonText>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            {populateStats()}
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin">
            <IonText className="title-text">Abilities</IonText>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            {populateAbilities()}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default PokemonModal;
