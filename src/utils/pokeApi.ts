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

export const getAllPokemon = async (limit: number = 151) => {
  return await (
    await P.getPokemonsList({ limit })
  ).results;
};

export const getPokemonByName = async (pokemonName: string) => {
  try {
    return await P.getPokemonByName(formatPokemonName(pokemonName));
  } catch (error) {
    console.error(error);
    return null; // TODO: add proper error handling in the future
  }
};

export const getPokemonArt = async (pokemonName: string) => {
  try {
    const pokemon = await P.getPokemonByName(formatPokemonName(pokemonName));
    const {
      sprites: {
        other: {
          "official-artwork": { front_default: pokemonOfficialArt },
        },
      },
    } = pokemon;

    return pokemonOfficialArt;
  } catch (error) {
    console.error(error);
    return null; // TODO: add proper error handling in the future
  }
};
