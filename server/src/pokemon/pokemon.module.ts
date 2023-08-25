import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PokemonEntity } from './pokemon.entity';
import { UserModule } from '../user/user.module'; // Import UserModule

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity]), UserModule], // Include UserModule here
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
