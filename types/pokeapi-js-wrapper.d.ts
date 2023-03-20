declare module "pokeapi-js-wrapper" {
  export class Pokedex {
    constructor(config?: PokedexConfig);
    getPokemonByName(name: string): Promise<Pokemon>;
    getPokemonByLimitOffset(
      limit?: number,
      offset?: number
    ): Promise<PaginatedResult<Pokemon>>;
    getTypeByName(name: string): Promise<Type>;
    getTypeByLimitOffset(
      limit?: number,
      offset?: number
    ): Promise<PaginatedResult<Type>>;
    getMoveByName(name: string): Promise<Move>;
    getMoveByLimitOffset(
      limit?: number,
      offset?: number
    ): Promise<PaginatedResult<Move>>;
    getItemByName(name: string): Promise<Item>;
    getItemByLimitOffset(
      limit?: number,
      offset?: number
    ): Promise<PaginatedResult<Item>>;
  }
  export interface PokedexConfig {
    protocol?: string;
    hostName?: string;
    versionPath?: string;
    cache?: boolean;
    timeout?: number;
    userAgent?: string;
  }
  export interface NamedAPIResource {
    name: string;
    url: string;
  }
  export interface PaginatedResult<T> {
    count: number;
    next?: string;
    previous?: string;
    results: T[];
  }
  export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    sprites: PokemonSprites;
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
  }
  export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
  }
  export interface VersionGameIndex {
    game_index: number;
    version: NamedAPIResource;
  }
  export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion[];
  }
  export interface PokemonHeldItemVersion {
    version: NamedAPIResource;
    rarity: number;
  }
  export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: PokemonMoveVersion[];
  }
  export interface PokemonMoveVersion {
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
    level_learned_at: number;
  }
  export interface PokemonSprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  }
  export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
  }
  export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
  }
  export interface Type {
    id: number;
    name: string;
    damage_relations: TypeRelations;
    game_indices: GenerationGameIndex[];
    generation: NamedAPI;
  }
}
