import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ADMIN_USERS_GROUP, AuthGuard, AuthUser, IUser } from '@skytech/auth';

import { CreateDepartmentDto } from './dto/create-department.dto';
import {
  DepartmentDto,
  DepartmentListResponseDto,
  DepartmentResponseDto,
} from './dto/department-response.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentService } from './department.service';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(AuthGuard([...ADMIN_USERS_GROUP]))
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
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentService.create(createDepartmentDto);
    return new DepartmentResponseDto({ department });
  }

  @ApiOperation({ summary: 'Get all departments' })
  @ApiOkResponse({
    description: 'List of all departments',
    type: DepartmentListResponseDto,
  })
  @Get('/')
  async findAll(@AuthUser() user: IUser) {
    const departments = await this.departmentService.findAll(user.uid);
    return new DepartmentListResponseDto({ departments });
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
  @Get(':id(\\d+)')
  async findOne(@Param('id') id: number, @AuthUser() user: IUser) {
    const department = await this.departmentService.findOne(id, user.uid);

    return new DepartmentResponseDto({ department });
  }

  @ApiOperation({
    summary: 'Update a department by ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Department ID',
    example: 328,
  })
  @ApiBody({
    type: UpdateDepartmentDto,
    description: 'Data for updating a department',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated department',
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Department with ID not found',
  })
  @Patch(':id(\\d+)')
  async update(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @AuthUser() user: IUser,
  ) {
    const department = await this.departmentService.update(
      id,
      updateDepartmentDto,
      user.uid,
    );
    return new DepartmentResponseDto({ department });
  }

  @Delete(':id(\\d+)')
  @ApiOperation({
    summary: 'Remove a department by ID',
    description:
      'Removes the department with the specified ID from the database',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The ID of the department to remove',
    example: 1,
  })
  remove(@Param('id') id: number, @AuthUser() user: IUser) {
    return this.departmentService.remove(id, user.uid);
  }
}
