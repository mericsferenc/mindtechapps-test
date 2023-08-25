import { UserDTO } from '../types';
import {  SET_USER, CLEAR_USER, CATCH_POKEMON, RELEASE_POKEMON  } from './actionTypes';

interface AppState {
  caughtPokemons: string[];
  user: UserDTO | null;
}

const initialState: AppState = {
  caughtPokemons: [],
  user: null,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case CATCH_POKEMON:
      return {
        ...state,
        caughtPokemons: [...state.caughtPokemons, action.payload],
      };
    case RELEASE_POKEMON:
      return {
        ...state,
        caughtPokemons: state.caughtPokemons.filter(
          (pokemon) => pokemon !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default appReducer;