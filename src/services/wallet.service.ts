import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(user: User) {
    const existsWallet = await this.walletRepository.findOne({
      where: { user: user },
    });
    if (existsWallet) throw new ConflictException();
    const newWallet = { user: user, accountNumber: '12345', balance: 1234 };
    return await this.walletRepository.save(newWallet);
  }

  async findByUser(user: User) {
    try {
      return await this.walletRepository.findOne({ where: { user: user } });
    } catch {
      throw new NotFoundException();
    }
  }
}
