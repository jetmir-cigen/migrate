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
  DepartmentListResponseDto,
  DepartmentResponseDto,
} from './dto/department-response.dto';

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
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @AuthUser() user: Express.AuthUser,
  ): Promise<DepartmentResponseDto> {
    const department = await this.departmentService.create(
      createDepartmentDto,
      user.cid,
    );
    return new DepartmentResponseDto({ department });
  }

  @ApiOperation({ summary: 'Get all departments' })
  @ApiOkResponse({
    description: 'List of all departments',
    type: DepartmentListResponseDto,
  })
  @Get('/')
  async findAll(
    @AuthUser() user: Express.AuthUser,
  ): Promise<DepartmentListResponseDto> {
    const [departments, total] = await this.departmentService.findAll(user.uid);
    return new DepartmentListResponseDto({ total, departments });
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
  async findOne(
    @Param('id') id: number,
    @AuthUser() user: Express.AuthUser,
  ): Promise<DepartmentResponseDto> {
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
    @AuthUser() user: Express.AuthUser,
  ): Promise<DepartmentResponseDto> {
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
  remove(
    @Param('id') id: number,
    @AuthUser() user: Express.AuthUser,
  ): Promise<boolean> {
    return this.departmentService.remove(id, user.uid);
  }
}
