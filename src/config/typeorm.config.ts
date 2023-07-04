import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    autoLoadEntities: true,
    // ssl: configService.get('database.ssl'),
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    synchronize: false,
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.user'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    // migrations: [path.join(__dirname, '../database/migrations/*{.ts,.js}')],
    logging: true,
  }),
};
