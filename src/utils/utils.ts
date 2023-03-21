export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPokemonName = (pokemonName: string) => {
  return pokemonName.replace(/[^0-9a-z]/gi, "").toLowerCase();
};
