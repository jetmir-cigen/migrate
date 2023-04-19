import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto, customerId: number) {
    try {
      const department = await this.departmentRepository.save({
        ...createDepartmentDto,
        customerId,
      });

      return department;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  findAll(userId: number) {
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

    return this.departmentRepository
      .createQueryBuilder('department')
      .select()
      .addFrom('view.manager_access_department', 'access')
      .andWhere('department.id = access.department_id')
      .andWhere('access.user_id = :userId', { userId })
      .getManyAndCount();
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
  ) {
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

  async remove(id: number, userId: number) {
    const department = await this.findOne(id, userId);

    console.log({ department });

    try {
      await this.departmentRepository.remove(department);
      return true;
    } catch (err) {
      console.log({ err });
      return false;
    }
  }

  async codeExists(code: string, departmentId?: number) {
    const res = await this.departmentRepository.findOneOrFail({
      where: { code },
      select: { code: true, id: true },
    });

    console.log({ res });

    if (res.id !== departmentId) {
      throw Error('Exists');
    }

    return false;
  }
}
