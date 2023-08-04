import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { getCurrentUserQuery } from './query';

type QueryFilters = {
  userId: number;
};

export interface CurrentUserProfileQueryResult {
  id: number;
  locale: string;
  country_id: number;
  username: string;
  phone_number: string;
  email: string;
  name: string;
  device_dealer_user_id: number;
  has_device_policy: boolean;
  is_password_change_required: boolean;
  currency: string;
  customer_id: number;
  customer_name: string;
}

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

  async execute({ filters }: FindCurrentUserByFilterQuery) {
    const { userId } = filters;

    try {
      const user = await this.repository.query(getCurrentUserQuery, [userId]);
      return user[0] as CurrentUserProfileQueryResult;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      throw err;
    }
  }
}
