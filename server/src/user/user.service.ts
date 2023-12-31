import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  login = async (data: UserDTO): Promise<any> => {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // return user.sanitizeObject({ withToken: true }); => it gave 204 no content for some reason...
    return user;
  };

  register = async (data: UserDTO): Promise<any> => {
    const { email } = data;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    } else {
      user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      // return user.sanitizeObject({ withToken: true }); => it gave 204 no content for some reason...
      return user;
    }
  };

  getProfile = async (email: string): Promise<any> => {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new HttpException('Email does not exist', HttpStatus.NOT_FOUND);
    return user.sanitizeObject({ withToken: true });
  };
}
