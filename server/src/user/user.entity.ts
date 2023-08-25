import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserSO } from './user.dto';
import { PokemonEntity } from 'src/pokemon/pokemon.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createdOn: Date;

  @OneToMany(() => PokemonEntity, (pokemon) => pokemon.user)
  pokemons: PokemonEntity[];

  @BeforeInsert()
  hashPassword = async () => {
    this.password = await hash(this.password, 8);
  };

  comparePassword = async (attempt: string) => {
    return await compare(attempt, this.password);
  };

  sanitizeObject = (options?: SanitizeUserOptions): UserSO => {
    const { id, createdOn, email, token } = this;
    const responseObj = { id, createdOn, email };
    if (options?.withToken) {
      Object.assign(responseObj, { token });
    }
    return responseObj;
  };

  private get token() {
    const { id, email } = this;
    return sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '3d' },
    );
  }
}

type SanitizeUserOptions = {
  withToken?: boolean;
};
