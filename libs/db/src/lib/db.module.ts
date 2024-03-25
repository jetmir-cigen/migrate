import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from '../config';
import { env } from '../env';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DbModule {}
