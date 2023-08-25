import { CATCH_POKEMON, RELEASE_POKEMON } from './actionTypes';

interface AppState {
  caughtPokemons: string[];
}

const initialState: AppState = {
  caughtPokemons: [],
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
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