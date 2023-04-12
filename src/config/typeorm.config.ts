import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
// import * as path from 'path';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    autoLoadEntities: true,
    ssl: configService.get('DB_SSL'),
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    synchronize: false,
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    // migrations: [path.join(__dirname, '../database/migrations/*{.ts,.js}')],
  }),
};
