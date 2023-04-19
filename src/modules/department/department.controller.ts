import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { DepartmentService } from './department.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth-user.decorator';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('/')
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @AuthUser() user: any,
  ) {
    return this.departmentService.create(createDepartmentDto, user.cid);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async findAll(@AuthUser() user: Express.User) {
    return this.departmentService.findAll(user.uid);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number, @AuthUser() user: Express.User) {
    return this.departmentService.findOne(id, user.uid);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateDepartmentDto: UpdateDepartmentDto,
  // ) {
  //   return this.departmentService.update(id, updateDepartmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.testService.remove(+id);
  // }
}
