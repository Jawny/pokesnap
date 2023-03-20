import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import { useEffect } from "react";
import { getAllPokemon } from "../../utils/pokeApi";
import "./Pokedex.css";

const Pokedex: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPokemon();
      console.log(res);
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokedex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Pokedex;
