import { CATCH_POKEMON, RELEASE_POKEMON } from './actionTypes';

export const catchPokemon = (pokemonName: string) => ({
  type: CATCH_POKEMON,
  payload: pokemonName,
});

export const releasePokemon = (pokemonName: string) => ({
  type: RELEASE_POKEMON,
  payload: pokemonName,
});
