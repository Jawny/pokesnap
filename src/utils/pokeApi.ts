import {
  Pokedex,
  PokemonAbility,
  PokemonStat,
  PokemonType,
} from "pokeapi-js-wrapper";

const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};

const P = new Pokedex(customOptions);

export const getAllPokemon = async (limit: number = 151) => {
  return await (
    await P.getPokemonsList({ limit })
  ).results;
};

export const getPokemonByName = async (pokemonName: string) => {
  try {
    return await P.getPokemonByName(pokemonName.toLowerCase());
  } catch (error) {
    console.error(error);
    return null; // TODO: add proper error handling in the future
  }
};

export const getPokemonArt = async (pokemonName: string) => {
  try {
    const pokemon = await P.getPokemonByName(pokemonName.toLowerCase());
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

export const formatAllAbilities = (abilities: PokemonAbility[]): string[] => {
  const result = abilities.map((ability: PokemonAbility) => {
    const {
      ability: { name },
    } = ability;

    return name;
  });

  return result;
};

export type FormatedStats = {
  baseStat: number;
  effort: number;
  statName: string;
};

export const formatAllStats = (stats: PokemonStat[]): FormatedStats[] => {
  const result = stats.map((stat: PokemonStat) => {
    const {
      base_stat: baseStat,
      effort,
      stat: { name: statName },
    } = stat;

    return { baseStat, effort, statName };
  });

  return result;
};

export const formatAllTypes = (types: PokemonType[]): string[] => {
  const result = types.map((type: PokemonType) => {
    const {
      type: { name },
    } = type;
    return name;
  });

  return result;
};
