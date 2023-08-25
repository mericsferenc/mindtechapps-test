export interface UserDTO {
    email: string
    password: string
    id: string
    createdOn: string
}

export interface Pokemon {
    pokemonId: string
    pokemonName: string
}

export interface PokemonType {
    name: string;
    url: string;
}
  
export interface PokemonListType {
    pokemon: {
      name: string;
      url: string;
    };
}