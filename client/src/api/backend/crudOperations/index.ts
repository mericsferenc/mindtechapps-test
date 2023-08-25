import axios from "axios";
import { API } from "../../../config";
import { UserDTO } from "../../../types";

export const catchPokemonApiCall = async (pokemonId: number, pokemonName: string, user: UserDTO) => {
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
  
  export const releasePokemonApiCall = async (user: UserDTO, pokemonId: string) => {
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