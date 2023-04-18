import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new test';
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

  findOne(id: number, userId: number) {
    return this.departmentRepository
      .createQueryBuilder('department')
      .select()
      .addFrom('view.manager_access_department', 'access')
      .andWhere('department.id = :id', { id })
      .andWhere('department.id = access.department_id')
      .andWhere('access.user_id = :userId', { userId })
      .getOne();
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
