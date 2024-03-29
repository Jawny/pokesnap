import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSearchbar,
} from "@ionic/react";
import { PokemonCard } from "../../components";
import {
  capitalizeFirstLetter,
  getAllPokemon,
  fetchAllSeenPokemon,
} from "../../utils/";
import "./Pokedex.css";

interface Pokemon {
  name: string;
  imageUrl: string;
}

const Pokedex: React.FC = () => {
  const [pokemonImages, setPokemonImages] = useState<Pokemon[]>([]);
  const [seenPokemon, setSeenPokemon] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

      const seenPokemonArray = await fetchAllSeenPokemon();
      const filteredPokemonArray = formattedPokemonArray.filter((pokemon) =>
        seenPokemonArray.includes(pokemon.name)
      );

      setPokemonImages(filteredPokemonArray);
      setSeenPokemon(seenPokemonArray);
    };

    fetchData();
  }, []);

  const filteredPokemon = pokemonImages.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokedex</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchTerm}
            onIonChange={(e) => setSearchTerm(e.detail.value!)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {seenPokemon.length > 0 ? (
          <IonGrid>
            {filteredPokemon.map((pokemon, index) => {
              const { name, imageUrl } = pokemon;

              return index % 2 === 0 ? (
                <IonRow key={index}>
                  <IonCol size="6">
                    <PokemonCard name={name} imageUrl={imageUrl} />
                  </IonCol>
                  <IonCol size="6">
                    {index + 1 < filteredPokemon.length && (
                      <PokemonCard
                        name={filteredPokemon[index + 1].name}
                        imageUrl={filteredPokemon[index + 1].imageUrl}
                      />
                    )}
                  </IonCol>
                </IonRow>
              ) : null;
            })}
          </IonGrid>
        ) : (
          <IonGrid style={{ height: "100%" }}>
            <IonRow
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonCol size="auto">
                <IonText
                  color="medium"
                  style={{ fontSize: "2rem", textAlign: "center" }}
                >
                  No Pokemon Found!
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Pokedex;
