import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AssetEntity } from '../entities/asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
