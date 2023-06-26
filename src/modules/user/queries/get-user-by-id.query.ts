import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelectByString, Repository } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '@/modules/user/entities/user.entity';

export class GetUserByIdQuery {
  constructor(
    public readonly id: number,
    public readonly showPassword?: boolean,
  ) {}
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
    const { id, showPassword } = query;
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        seller: true,
        countryId: true,
        phoneNumber: true,
        userGroupId: true,
        customerId: true,
        password: showPassword,
      },
    });
  }
}
