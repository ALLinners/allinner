import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(user: User) {
    const existsUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (existsUser) {
      await this.userRepository.update(
        { id: existsUser.id },
        { name: user.name },
      );
      throw new ConflictException();
    }
    return this.userRepository.save(user);
  }
}
