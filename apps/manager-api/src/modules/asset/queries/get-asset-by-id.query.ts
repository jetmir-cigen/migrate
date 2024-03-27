import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssetEntity } from '@skytech/db';

export class GetAssetByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetAssetByIdQuery)
export class GetAssetByIdQueryHandler
  implements IQueryHandler<GetAssetByIdQuery>
{
  constructor(
    @InjectRepository(AssetEntity)
    private readonly repository: Repository<AssetEntity>,
  ) {}

  async execute({ id }: GetAssetByIdQuery) {
    return await this.repository.findOneOrFail({
      where: { id },
    });
  }
}
