import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '@/modules/user/entities/user.entity';

export class GetUserByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUserByIdQuery) {
    const { id } = query;
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'seller',
        'countryId',
        'phoneNumber',
        'userGroupId',
      ],
    });
  }
}
