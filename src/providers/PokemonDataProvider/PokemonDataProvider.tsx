import { createContext, useState } from "react";
import {
  formatAllAbilities,
  formatAllStats,
  formatAllTypes,
  getPokemonByName,
} from "../../utils";
import {
  IPokemon,
  IPokemonData,
  IPokemonDataContext,
} from "./PokemonDataProviderInterfaces";

export const PokemonDataContext = createContext<IPokemonDataContext>({
  pokemonData: {},
  updatePokemonData: () => {},
  handleAddPokemon: () => Promise<IPokemon | null>,
});

export const PokemonDataProvider = ({ children }: any) => {
  const [pokemonData, setPokemonData] = useState<IPokemonData>({});

  const handleAddPokemon = async (name: string): Promise<IPokemon | null> => {
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
      return newPokemon;
    }
    return null;
  };

  const updatePokemonData = (name: string, value: IPokemon) => {
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
