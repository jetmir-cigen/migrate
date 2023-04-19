import {
  Body,
  Controller,
  Get,
  NotFoundException,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  DepartmentDto,
  DepartmentResponseDto,
} from './dto/department-response.dto';
import { EntityNotFoundError } from 'typeorm';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({
    summary: 'Create a new department',
  })
  @ApiBody({
    type: CreateDepartmentDto,
    description: 'Data for creating a new department',
  })
  @ApiResponse({
    status: 201,
    description: 'The created department',
    type: DepartmentDto,
  })
  @Post('/')
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @AuthUser() user: any,
  ) {
    return this.departmentService.create(createDepartmentDto, user.cid);
  }

  @ApiOperation({ summary: 'Get all departments' })
  @ApiOkResponse({
    description: 'List of all departments',
    type: DepartmentResponseDto,
  })
  @Get('/')
  async findAll(@AuthUser() user: Express.User) {
    return this.departmentService.findAll(user.uid);
  }

  @ApiOperation({
    summary: 'Find a department by ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Department ID',
    example: 328,
  })
  @ApiResponse({
    status: 200,
    description: 'The found department',
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 404,
    description: `Department with ID not found`,
  })
  @Get('/:id')
  async findOne(@Param('id') id: number, @AuthUser() user: Express.User) {
    try {
      const department = await this.departmentService.findOne(id, user.uid);
      return department;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Department with ID ${id} not found`);
      }
      throw err;
    }
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
