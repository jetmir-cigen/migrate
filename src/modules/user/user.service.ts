import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

type QueryFilters = {
  username?: string;
  name?: string;
  type?: string;
  email?: string;
  seller?: boolean;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(
    { username, name, seller }: QueryFilters,
    items: number,
  ): Promise<UserEntity[]> {
    const where = [];
    if (username) {
      where.push({ username });
    }
    if (name) {
      where.push({ firstName: name }, { lastName: name });
    }
    if (seller) {
      where.push({ seller });
    }
    return this.userRepository.find({
      where: where.length ? where : undefined,
      take: items,
      select: ['username', 'email', 'seller', 'firstName', 'lastName'],
    });
  }
}
