import axios from "axios";
import { API } from "../../../config";

export const catchPokemonApiCall = async (pokemonId: number, pokemonName: string, user: any) => {
    try {
      await axios({
        method: 'POST',
        url: `${API}/pokemon/catch`,
        data: {
          pokemonId: pokemonId,
          pokemonName: pokemonName,
          user: user,
        }
      });
    } catch (error) {
      console.error('Failed to catch pokemon:', error);
    }
  };
  
  export const releasePokemonApiCall = async (user: any, pokemonId: string) => {
      try {
        await axios({
          method: 'POST',
          url: `${API}/pokemon/release`,
          data: {
            user,
            pokemonId,
          },
        });
      } catch (error) {
        console.error('Failed to release pokemon:', error);
      }
  };