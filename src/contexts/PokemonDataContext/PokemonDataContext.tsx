import { createContext, useState } from "react";
import {
  formatAllAbilities,
  formatAllStats,
  formatAllTypes,
  getPokemonByName,
} from "../../utils";
import { FormatedStats } from "../../utils/pokeApi";
interface Pokemon {
  name: string;
  height: number;
  stats: FormatedStats[];
  abilities: string[];
  types: string[];
  weight: number;
}

interface IPokemonData {
  [key: string]: Pokemon;
}

interface IPokemonDataContext {
  pokemonData: IPokemonData;
  updatePokemonData: (name: string, value: Pokemon) => void;
  handleAddPokemon: (name: string) => void;
}

export const PokemonDataContext = createContext<IPokemonDataContext>({
  pokemonData: {},
  updatePokemonData: () => {},
  handleAddPokemon: () => {},
});

export const PokemonDataProvider = ({ children }: any) => {
  const [pokemonData, setPokemonData] = useState<IPokemonData>({});

  const handleAddPokemon = async (name: string) => {
    const formattedPokemonName = name.toLowerCase();
    const fetchedPokemonData = await getPokemonByName(formattedPokemonName);

    if (fetchedPokemonData != null) {
      const { abilities, name, height, weight, stats, types } =
        fetchedPokemonData;
      const formattedAbilities = formatAllAbilities(abilities);
      const formattedStats = formatAllStats(stats);
      const formattedTypes = formatAllTypes(types);
      const newPokemon = {
        name,
        height,
        stats: formattedStats,
        abilities: formattedAbilities,
        types: formattedTypes,
        weight,
      };
      updatePokemonData(newPokemon.name, newPokemon);
    }
  };

  const updatePokemonData = (name: string, value: Pokemon) => {
    setPokemonData((prevPokemonData) => ({
      ...prevPokemonData,
      [name]: value,
    }));
  };

  return (
    <PokemonDataContext.Provider
      value={{
        pokemonData,
        updatePokemonData,
        handleAddPokemon,
      }}
    >
      {children}
    </PokemonDataContext.Provider>
  );
};
