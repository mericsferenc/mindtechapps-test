import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonDetail {
  name: string;
  weight: number;
  height: number;
  abilities: Ability[];
  sprites: {
    front_default: string;
  };
}


function PokemonProfile(): JSX.Element {
    const { pokemonName }: any = useParams();
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
  
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  useEffect(() => {
    const fetchPokemonDetail = async (): Promise<void> => {
      try {
        const response = await axios.get(pokemonUrl);
        setPokemonDetail(response.data);
      } catch (error) {
        console.error('Failed to fetch pokemon details:', error);
      }
    };

    fetchPokemonDetail();
  }, [pokemonUrl]);

  if (!pokemonDetail) {
    return <div>Loading...</div>;
  }

  const notHiddenAbilities = pokemonDetail.abilities.filter((ability: Ability) => !ability.is_hidden);

  return (
    <div>
      <h2>Pokemon Profile</h2>
      <img src={pokemonDetail.sprites.front_default} alt={`${pokemonDetail.name} sprite`} />
      <p>Name: {pokemonDetail.name}</p>
      <p>Weight: {pokemonDetail.weight} kg</p>
      <p>Height: {pokemonDetail.height} cm</p>
      <p>Abilities:</p>
      <ul>
        {notHiddenAbilities.map((ability: Ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonProfile;
