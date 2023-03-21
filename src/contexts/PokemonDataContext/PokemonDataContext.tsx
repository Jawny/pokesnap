import { createContext, useCallback, useState } from "react";

interface Pokemon {
  name: string;
  height: string;
}

interface IPokemonData {
  [key: string]: Pokemon;
}

export const PokemonDataContext = createContext({
  pokemonData: {},
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
