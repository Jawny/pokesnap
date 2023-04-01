import { FormatedStats } from "../../utils/pokeApi";

interface IPokemon {
  name: string;
  height: number;
  stats: FormatedStats[];
  abilities: string[];
  types: string[];
  weight: number;
}

interface IPokemonData {
  [key: string]: IPokemon;
}

interface IPokemonDataContext {
  pokemonData: IPokemonData;
  updatePokemonData: (name: string, value: IPokemon) => void;
  handleAddPokemon: (name: string) => void;
}

export type { IPokemon, IPokemonData, IPokemonDataContext };
