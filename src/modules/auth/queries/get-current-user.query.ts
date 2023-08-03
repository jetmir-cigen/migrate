import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { getCurrentUserQuery } from './query';

type QueryFilters = {
  userId: number;
};

export class FindCurrentUserByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindCurrentUserByFilterQuery)
export class FindCurrentUserByFilterQueryHandler
  implements IQueryHandler<FindCurrentUserByFilterQuery>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async execute({
    filters,
  }: FindCurrentUserByFilterQuery): Promise<UserEntity> {
    const { userId } = filters;

    try {
      const user = await this.repository.query(getCurrentUserQuery, [userId]);
      return user[0];
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      throw err;
    }
  }
}
