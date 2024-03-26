import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { DepartmentEntity } from '@skytech/db';

const selectedFields = [
  'department.id',
  'department.code',
  'department.name',
  'department.project',
  'department.inactive',
  'department.deputyMail',
  'department.departmentBillingRef',
  'user.id',
  'user.firstName',
  'user.lastName',
  'deputyUser.id',
  'deputyUser.firstName',
  'deputyUser.lastName',
  'department.customerId',
  'department.userId',
  'department.deputyUserId',
  'customer.id',
  'customer.name',
];

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.save({
      ...createDepartmentDto,
    });

    return this.departmentRepository.findOneOrFail({
      where: { id: department.id },
      relations: ['user', 'deputyUser', 'customer'],
    });
  }

  async findAll(userId: number): Promise<DepartmentEntity[]> {
    const departments = await this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.user', 'user')
      .leftJoinAndSelect('department.deputyUser', 'deputyUser')
      .leftJoinAndSelect('department.customer', 'customer')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('department_id')
          .from('view.manager_access_department', 'access')
          .where('access.user_id = :userId', { userId })
          .getQuery();
        return 'department.id IN ' + subQuery;
      })
      .select(selectedFields)
      .getMany();

    return departments;
  }

  async findOne(id: number, userId: number): Promise<DepartmentEntity> {
    try {
      const department = await this.departmentRepository
        .createQueryBuilder('department')
        .leftJoinAndSelect('department.user', 'user')
        .leftJoinAndSelect('department.deputyUser', 'deputyUser')
        .leftJoinAndSelect('department.customer', 'customer')
        .where({ id })
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('department_id')
            .from('view.manager_access_department', 'access')
            .where('access.user_id = :userId', { userId })
            .getQuery();
          return 'department.id IN ' + subQuery;
        })
        .select(selectedFields)
        .getOneOrFail();

      return department;
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
    await this.findOne(id, userId);

    await this.departmentRepository.update(id, updateDepartmentDto);
    return this.departmentRepository.findOneOrFail({
      where: { id },
      relations: ['user', 'deputyUser', 'customer'],
    });
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
