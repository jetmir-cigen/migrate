import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './modules/department/department.module';
import { configValidationSchema, typeOrmAsyncConfig } from './config';
import { ElementLabelModule } from './modules/element-label/element-label.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    DepartmentModule,
    ElementLabelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
