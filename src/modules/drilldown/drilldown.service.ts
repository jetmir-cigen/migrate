import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerAccessFrameAgreementViewEntity } from '@/common/entities/manager-access-frame-agreement-view.entity';
import { Repository } from 'typeorm';
import { DrillDownServiceType } from '@/modules/drilldown/dto/product-categories-param.dto';

@Injectable()
export class DrillDownService {
  constructor(
    @InjectRepository(ManagerAccessFrameAgreementViewEntity)
    readonly mafRepository: Repository<ManagerAccessFrameAgreementViewEntity>,
  ) {}

  async getCustomerAccessList(userId: number): Promise<string> {
    const maf = await this.mafRepository.find({
      where: { userId: userId },
      select: ['customerId'],
    });
    return maf.map((item) => item.customerId).join(',');
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
}
