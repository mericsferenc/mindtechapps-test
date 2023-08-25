import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon, UserDTO } from '../types';
import { API } from '../config';
import Loader from './Loader';

function MyPokemons(user: UserDTO) {
  const [pokemonIdToCatch, setPokemonIdToCatch] = useState('');
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('pokemonId');
  const [loading, setLoading] = useState(true);

  const customSort = (a: Pokemon, b: Pokemon): number => {
    if (sortBy === 'pokemonId') {
      return Number(a[sortBy]) - Number(b[sortBy]);
    }
    return a[sortBy].localeCompare(b[sortBy]);
  };

  const fetchCaughtPokemons = async () => {
    try {
      setLoading(true);

      const response = await axios({
        method: 'POST',
        url: `${API}/pokemon/all`,
        data: {
          user: user,
        },
      });

      setCaughtPokemons(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch caught pokemons:', error);
      setLoading(false);
    }
  };

  const filteredAndSortedPokemons = caughtPokemons
    .filter((pokemon: Pokemon) => pokemon.pokemonName.includes(searchQuery))
    .sort(customSort);

  useEffect(() => {
    fetchCaughtPokemons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const catchPokemon = async () => {
    if (!pokemonIdToCatch) return;
  
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdToCatch}`);
      
      const pokemonToSave = {
        id: response.data.id,
        name: response.data.name,
      };

      await axios({
        method: 'POST',
        url: `${API}/pokemon/catch`,
        data: {
          pokemonId: parseInt(pokemonToSave.id), 
          pokemonName: pokemonToSave.name,
          user: user,
        }
      });

      setPokemonIdToCatch('');

      fetchCaughtPokemons();
  
    } catch (error) {
      console.error('Failed to catch pokemon:', error);
    }
  };

  const releasePokemon = async (pokemonId: string) => {
    try {
      await axios({
        method: 'POST',
        url: `${API}/pokemon/release`,
        data: {
          user,
          pokemonId,
        },
      });
      const updatedCaughtPokemons = caughtPokemons.filter(
        (pokemon: Pokemon) => pokemon.pokemonId !== pokemonId
      );
      setCaughtPokemons(updatedCaughtPokemons);
    } catch (error) {
      console.error('Failed to release pokemon:', error);
    }
  };

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
        <input
          type="text"
          placeholder="Search by Pokemon Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="pokemonId">Sort by ID</option>
          <option value="pokemonName">Sort by Name</option>
        </select>

        <br/>
        <h2>Caught Pokemons</h2>
        {loading ? (
          <Loader />
        ) : (
          <ul>
            {filteredAndSortedPokemons.map((pokemon: Pokemon) => (
              <div key={pokemon.pokemonId} style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                width: "400px",
                border: "6px solid #ff0000",
                paddingLeft: "12px",
                margin: "3px",
                }}>
                <li>
                  {pokemon.pokemonId} - {pokemon.pokemonName}
                </li>
                <button onClick={() => releasePokemon(pokemon.pokemonId)}>
                  RELEASE
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPokemons;
