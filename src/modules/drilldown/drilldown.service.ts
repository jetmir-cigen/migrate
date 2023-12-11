import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrillDownServiceType } from '@/modules/drilldown/dto/product-categories-param.dto';
import { ManagerAccessFrameAgreementViewEntity } from '@/common/views';

@Injectable()
export class DrillDownService {
  constructor(
    @InjectRepository(ManagerAccessFrameAgreementViewEntity)
    readonly macFrameAgreementRepository: Repository<ManagerAccessFrameAgreementViewEntity>,
  ) {}

  async getCustomerAccessList(userId: number): Promise<string> {
    const macFrameAgreement = await this.macFrameAgreementRepository.find({
      where: { userId },
      select: ['customerId'],
    });

    return macFrameAgreement.map((item) => item.customerId).join(',');
  }

  async getCustomerAccessListArr(userId: number): Promise<number[]> {
    const macFrameAgreement = await this.macFrameAgreementRepository.find({
      where: { userId },
      select: ['customerId'],
    });

    return macFrameAgreement.map((item) => item.customerId);
  }

  getPeriodFilter(year: number, period: number): string {
    return period <= 0
      ? `AND YEAR(ir.date) = ${year}`
      : `AND (YEAR(ir.date) = ${year} AND MONTH(ir.date) = ${period})`;
  }

  getOrgFilter(
    frameAgreementId: number,
    customerHeadId: number,
    customerId: number,
  ) {
    if (frameAgreementId) {
      return ` AND c.customer_head_frame_agreement_id = ${frameAgreementId} `;
    }
    if (customerHeadId) {
      return ` AND c.customer_head_id = ${customerHeadId} `;
    }
    return ` AND c.id = ${customerId} `;
  }

  getTypes(type: DrillDownServiceType, typeId: number) {
    const frameAgreementId =
      type === DrillDownServiceType.FRAME_AGREEMENT ? typeId : null;
    const customerHeadId =
      type === DrillDownServiceType.CUSTOMER_HEAD ? typeId : null;
    const customerId = type === DrillDownServiceType.CUSTOMER ? typeId : null;
    return { frameAgreementId, customerHeadId, customerId };
  }

  getEntity = async (
    userId: number,
    type: DrillDownServiceType,
    typeId: number,
  ) => {
    const customerAccessList = await this.getCustomerAccessList(userId);

    if (type === DrillDownServiceType.FRAME_AGREEMENT) {
      return await this.macFrameAgreementRepository.query(
        `SELECT customer_head_frame_agreement_id AS id, customer_head_frame_agreement_name AS name FROM view.customer WHERE id IN(${customerAccessList}) AND customer_head_frame_agreement_id = ? LIMIT 1`,
        [typeId],
      );
    }

    if (type === DrillDownServiceType.CUSTOMER_HEAD) {
      return await this.macFrameAgreementRepository.query(
        `SELECT customer_head_id AS id, customer_head_name AS name FROM view.customer WHERE id IN(${customerAccessList}) AND customer_head_id = ? LIMIT 1`,
        [typeId],
      );
    }

    if (type === DrillDownServiceType.CUSTOMER) {
      return await this.macFrameAgreementRepository.query(
        `SELECT id, name FROM control.customer WHERE id IN(${customerAccessList}) AND id = ? LIMIT 1`,
        [typeId],
      );
    }
  };

  getCategory = async (categoryId: number) => {
    return this.macFrameAgreementRepository.query(
      `SELECT id, name FROM control.product_category WHERE id = ? LIMIT 1`,
      [categoryId],
    );
  };

  getGroup = async (groupId: number) => {
    return this.macFrameAgreementRepository.query(
      `SELECT id, name FROM control.product_group WHERE id = ? LIMIT 1`,
      [groupId],
    );
  };
}
