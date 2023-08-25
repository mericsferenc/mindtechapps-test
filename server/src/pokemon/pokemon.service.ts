// src/pokemon/pokemon.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { UserService } from '../user/user.service';
import { CatchPokemonDTO } from './pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,
    private userService: UserService,
  ) {}

  async findPokemonByUserAndPokemonId(
    userEmail: string,
    pokemonId: number,
  ): Promise<PokemonEntity | undefined> {
    return this.pokemonRepository.findOne({
      where: {
        user: { email: userEmail },
        pokemonId,
      },
    });
  }

  async catchPokemon(userEmail: string, catchPokemonDTO: CatchPokemonDTO) {
    const user = await this.userService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPokemon = this.pokemonRepository.create({
      ...catchPokemonDTO,
      user,
    });

    await this.pokemonRepository.save(newPokemon);

    return newPokemon;
  }
}
