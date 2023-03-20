import { Pokedex } from "pokeapi-js-wrapper";

const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};

const P = new Pokedex(customOptions);

const formatPokemonName = (pokemonName: string) => {
  return pokemonName.replace(/[^0-9a-z]/gi, "").toLowerCase();
};

export const getPokemonByName = async (pokemonName: string) => {
  return await P.getPokemonByName(formatPokemonName(pokemonName));
};
