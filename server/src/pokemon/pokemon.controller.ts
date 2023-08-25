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
}
