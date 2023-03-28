import { createContext, useCallback, useState } from "react";
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

export const PokemonDataContext = createContext({
  pokemonData: {} as IPokemonData,
  updatePokemonData: (name: string, value: Pokemon) => {},
});

export const PokemonDataProvider = ({ children }: any) => {
  const [pokemonData, setPokemonData] = useState<IPokemonData>({});

  const updatePokemonData = useCallback((name: string, value: Pokemon) => {
    setPokemonData((prevPokemonData) => ({
      ...prevPokemonData,
      [name]: value,
    }));
  }, []);

  return (
    <PokemonDataContext.Provider value={{ pokemonData, updatePokemonData }}>
      {children}
    </PokemonDataContext.Provider>
  );
};
