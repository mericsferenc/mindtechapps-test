import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { catchPokemon, releasePokemon } from '../redux/actions';
import Loader from './Loader';

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
    const caughtPokemons = useSelector((state: any) => state.caughtPokemons);
    const dispatch = useDispatch();
  
    const isCaught = caughtPokemons.includes(pokemonName);

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const handleCatchRelease = () => {
        if (isCaught) {
          dispatch(releasePokemon(pokemonName));
        } else {
          dispatch(catchPokemon(pokemonName));
        }
      };

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
    return <Loader />;
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
      <br/>
      <br/>
      <br/>
      <button onClick={handleCatchRelease} style={{ background: isCaught ? "orange" : "lightgreen" }}>
        {isCaught ? 'Release' : 'Catch'}
      </button>
    </div>
  );
}

export default PokemonProfile;
