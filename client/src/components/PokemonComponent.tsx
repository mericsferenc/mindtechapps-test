import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon, UserDTO } from '../types';
import { API } from '../config';

function PokemonComponent(user: UserDTO) {
  const [pokemonIdToCatch, setPokemonIdToCatch] = useState('');
  const [caughtPokemons, setCaughtPokemons] = useState([]);

  useEffect(() => {
    const fetchCaughtPokemons = async () => {
      try {

        const response = await axios({
          method: 'POST',
          url: `${API}/pokemon/all`,
          data: {
            user: user,
          }
        });

        setCaughtPokemons(response.data);
      } catch (error) {
        console.error('Failed to fetch caught pokemons:', error);
      }
    };

    fetchCaughtPokemons();
  }, [user]);

  const catchPokemon = async () => {
    if (!pokemonIdToCatch) return;
  
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdToCatch}`);
      
      const pokemonToSave = {
        id: response.data.id,
        name: response.data.name,
      };

      console.log(pokemonToSave)

      

      const res = await axios({
        method: 'POST',
        url: `${API}/pokemon/catch`,
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

        <div>
          <h2>Caught Pokemons</h2>
          <ul>
            {caughtPokemons.map((pokemon: Pokemon) => (
              <div>
                <li key={pokemon.pokemonId}>{pokemon.pokemonName}</li>
                <button>RELEASE</button>
              </div>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default PokemonComponent;