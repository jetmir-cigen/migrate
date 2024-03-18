import { Injectable } from '@nestjs/common';
import { SalaryDeductionProfileEntity } from './entities/salary-deduction-profile.entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TelePolicyService {
  constructor(
    @InjectRepository(SalaryDeductionProfileEntity)
    private readonly repository: Repository<SalaryDeductionProfileEntity>,
  ) {}

  /*
    DELETE FROM control.customer_product WHERE salary_deduction_profile_id = salary_deduction_profile_id;
  */

  async deleteCustomerProductBySalaryDeductionProfileId(
    salaryDeductionProfileId: number,
    qr?: QueryRunner,
  ): Promise<void> {
    const query = this.repository
      .createQueryBuilder()
      .delete()
      .from('control.customer_product')
      .where('salary_deduction_profile_id = :salaryDeductionProfileId', {
        salaryDeductionProfileId,
      });

    if (qr) query.setQueryRunner(qr);

    await query.execute();
  }

  /*
    INSERT INTO control.customer_product (product_id, private, salary_deduction_profile_id)
    SELECT p.id, TRUE, salary_deduction_profile_id
    FROM control.tele_policy_template_product_group tptpg
    LEFT JOIN control.product p ON tptpg.product_group_id = p.product_group_id
    WHERE tptpg.tele_policy_template_id = tele_policy_template_id;
  */
  async insertCustomerProductByTelePolicyTemplateId(
    telePolicyTemplateId: number,
    salaryDeductionProfileId: number,
    qr?: QueryRunner,
  ): Promise<void> {
    const queryRunner =
      qr || this.repository.manager.connection.createQueryRunner();

    queryRunner.query(
      `INSERT INTO control.customer_product (product_id, private, salary_deduction_profile_id)
        SELECT p.id, TRUE, ?
        FROM control.tele_policy_template_product_group tptpg
        JOIN control.product p ON tptpg.product_group_id = p.product_group_id
        WHERE tptpg.tele_policy_template_id = ?`,
      [salaryDeductionProfileId, telePolicyTemplateId],
    );

    if (!qr) {
      await queryRunner.release();
    }
  }
}
