import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private userService: UserService,
    private pokemonService: PokemonService,
  ) {}

  @Post('catch')
  // AuthGuard should be used here...
  // @UseGuards(new AuthGuard())
  async catchPokemon(@Body() pokemon) {
    const { pokemonId, pokemonName, user } = pokemon;

    const existingPokemon =
      await this.pokemonService.findPokemonByUserAndPokemonId(
        user.email,
        pokemonId,
      );

    if (existingPokemon) {
    } else {
      await this.pokemonService.catchPokemon(user.email, {
        pokemonId,
        pokemonName,
      });
    }
  }

  @Post('all')
  // AuthGuard should be used here...
  // @UseGuards(new AuthGuard())
  async getCaughtPokemons(@Body() userData) {
    const { user } = userData;

    const caughtPokemons = await this.pokemonService.getCaughtPokemons(
      user.email,
    );
    return caughtPokemons;
  }

  @Post('release')
  // AuthGuard should be used here...
  // @UseGuards(new AuthGuard(
  async releasePokemon(@Body() requestData) {
    const { user, pokemonId } = requestData;

    const releasedPokemon = await this.pokemonService.releasePokemon(
      user.email,
      pokemonId,
    );

    return releasedPokemon;
  }
}
