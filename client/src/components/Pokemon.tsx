import React, { useState } from 'react';
import axios from 'axios';
import { UserDTO } from '../types';

function Pokemon(user: UserDTO) {
  const [pokemonIdToCatch, setPokemonIdToCatch] = useState('');

  const catchPokemon = async () => {
    if (!pokemonIdToCatch) return;
  
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdToCatch}`);
      
      const pokemonToSave = {
        id: response.data.id,
        name: response.data.name,
      };

      console.log(pokemonToSave)

      const HOST = 'http://localhost:8080/api'

      const res = await axios({
        method: 'POST',
        url: `${HOST}/pokemon/catch`,
        data: {
          pokemonId: parseInt(pokemonToSave.id), 
          pokemonName: pokemonToSave.name,
          user: user,
        }
      });

      console.log(res)

      setPokemonIdToCatch('');
  
    } catch (error) {
      console.error('Failed to catch pokemon:', error);
    }
  }; // add it to the db

  // const releasePokemon = async () => {} // remove it from the db

  return (
    <div>
        <input
          type="number"
          placeholder="Pokemon ID"
          value={pokemonIdToCatch}
          onChange={(e) => setPokemonIdToCatch(e.target.value)}
        />
        <button onClick={catchPokemon}>Catch</button>
    </div>
  );
}

export default Pokemon;
