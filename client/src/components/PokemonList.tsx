import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PokemonListType, PokemonType } from '../types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PokemonList(): JSX.Element {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPokemons, setFilteredPokemons] = useState<string[]>([]);
  const [showCaughtOnly, setShowCaughtOnly] = useState<boolean>(false);

  const caughtPokemons = useSelector((state: any) => state.caughtPokemons);


  useEffect(() => {
    const fetchTypes = async (): Promise<void> => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error('Failed to fetch types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemonsByType = async (typeUrl: string): Promise<void> => {
      try {
        const response = await axios.get(typeUrl);
        const pokemonNames = response.data.pokemon.map((entry: PokemonListType) => entry.pokemon.name);
        setFilteredPokemons(pokemonNames);
      } catch (error) {
        console.error('Failed to fetch pokemons by type:', error);
      }
    };

    if (selectedType) {
      fetchPokemonsByType(selectedType);
    } else {
      setFilteredPokemons([]);
    }


    console.log("caughtPokemons", caughtPokemons)

  }, [selectedType]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedType(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const filteredResults = filteredPokemons.filter((pokemon: string) =>
    pokemon.includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowCaughtOnly(event.target.checked);
  };

  const filteredCaughtResults = showCaughtOnly
    ? filteredResults.filter((pokemon: string) => caughtPokemons.includes(pokemon)) // Filter caught pokemons
    : filteredResults;

  return (
    <div>
      <h2>Select a Pokemon Type</h2>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">All</option>
        {types.map((type: PokemonType) => (
          <option key={type.name} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>

      <h2>Search by Name</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <h2>Catched Pokemons Only</h2>
      <input
        type="checkbox"
        checked={showCaughtOnly}
        onChange={handleCheckboxChange}
      />

    <h2>Pokemons</h2>
      <ul>
        {filteredCaughtResults.map((pokemonName: string) => (
          <li key={pokemonName}>
            <Link to={`/pokemon-profile/${pokemonName}`}>{pokemonName}</Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default PokemonList;
