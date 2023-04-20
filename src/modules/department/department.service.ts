import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { DepartmentListResponseDto } from './dto/department-response.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
    customerId: number,
  ): Promise<DepartmentEntity> {
    try {
      const department = await this.departmentRepository.save({
        ...createDepartmentDto,
        customerId,
      });

      return department;
    } catch (err) {
      throw err;
    }
  }

  async findAll(userId: number): Promise<[DepartmentEntity[], number]> {
    // return this.departmentRepository
    //   .createQueryBuilder('department')
    //   .where((qb) => {
    //     const subQuery = qb
    //       .subQuery()
    //       .select('department_id')
    //       .from('view.manager_access_department', 'access')
    //       .where('access.user_id = :userId', { userId })
    //       .getQuery();
    //     return 'department.id IN ' + subQuery;
    //   })
    //   .getManyAndCount();

    const [departments, total] = await this.departmentRepository
      .createQueryBuilder('department')
      .select()
      .addFrom('view.manager_access_department', 'access')
      .andWhere('department.id = access.department_id')
      .andWhere('access.user_id = :userId', { userId })
      .getManyAndCount();

    return [departments, total] as [DepartmentEntity[], number];
  }

  async findOne(id: number, userId: number): Promise<DepartmentEntity> {
    try {
      const department = await this.departmentRepository
        .createQueryBuilder('department')
        .select()
        .addFrom('view.manager_access_department', 'access')
        .andWhere('department.id = :id', { id })
        .andWhere('department.id = access.department_id')
        .andWhere('access.user_id = :userId', { userId })
        .getOneOrFail();

      return department as DepartmentEntity;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Department with ID ${id} not found`);
      }
      throw err;
    }
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
    userId: number,
  ): Promise<DepartmentEntity> {
    const department = await this.findOne(id, userId);

    const updatedDepartment = {
      ...department,
      ...updateDepartmentDto,
    };

    try {
      await this.departmentRepository.update(id, updatedDepartment);
      return updatedDepartment;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number, userId: number): Promise<boolean> {
    const department = await this.findOne(id, userId);

    try {
      await this.departmentRepository.remove(department);
      return true;
    } catch (err) {
      return false;
    }
  }

  async codeExists(code: string, departmentId?: number): Promise<boolean> {
    const res = await this.departmentRepository.findOneOrFail({
      where: { code },
      select: { code: true, id: true },
    });

    if (res.id !== departmentId) {
      throw Error('Exists');
    }

    return false;
  }
}
