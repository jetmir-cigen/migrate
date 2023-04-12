import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
