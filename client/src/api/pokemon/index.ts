import axios from 'axios';
import { POKEMON_API } from '../../config';

export const fetchPokemonById = async (pokemonIdToCatch: string) => {
  try {
    const response = await axios.get(`${POKEMON_API}/pokemon/${pokemonIdToCatch}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pokemon:', error);
    return null;
  }
};
