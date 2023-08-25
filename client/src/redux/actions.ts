import { CATCH_POKEMON, CLEAR_USER, RELEASE_POKEMON, SET_USER } from './actionTypes';

export const catchPokemon = (pokemonName: string) => ({
  type: CATCH_POKEMON,
  payload: pokemonName,
});

export const releasePokemon = (pokemonName: string) => ({
  type: RELEASE_POKEMON,
  payload: pokemonName,
});

export const setUser = (user: any) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});