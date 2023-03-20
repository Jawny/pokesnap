import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { capitalizeFirstLetter, getAllPokemon } from "../../utils/";
import "./Pokedex.css";

interface Pokemon {
  name: string;
  imageUrl: string;
}

const Pokedex: React.FC = () => {
  const [pokemonImages, setPokemonImages] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPokemon();
      const formattedPokemonArray = res.map((pokemon, idx) => {
        const { name } = pokemon;
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          idx + 1
        }.png`;
        return { name: capitalizeFirstLetter(name), imageUrl };
      });
      setPokemonImages(formattedPokemonArray);
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
      <IonContent>
        <IonGrid>
          {pokemonImages.map((pokemon, index) => {
            const { name, imageUrl: src } = pokemon;

            return index % 2 === 0 ? (
              <IonRow key={index}>
                <IonCol size="6">
                  <IonCard className="card-wrapper">
                    <IonImg src={src} alt={`Image ${index}`} />
                    <IonCardHeader>
                      <IonCardTitle>{name}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
                <IonCol size="6">
                  {index + 1 < pokemonImages.length && (
                    <IonCard className="card-wrapper">
                      <IonImg
                        src={pokemonImages[index + 1].imageUrl}
                        alt={`Image ${index + 1}`}
                      />
                      <IonCardHeader>
                        <IonCardTitle>
                          {pokemonImages[index + 1].name}
                        </IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  )}
                </IonCol>
              </IonRow>
            ) : null;
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Pokedex;
