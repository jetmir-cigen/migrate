import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { DrillDownServiceType } from '@skytech/manager/modules/drilldown/dto/product-categories-param.dto';
import {
  ManagerAccessDepartmentView,
  ManagerAccessFrameAgreementViewEntity,
} from '@skytech/manager/common/views';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { CustomerHeadEntity } from '@skytech/manager/common/entities/customer-head.entity';
import { CustomerHeadFrameAgreementEntity } from '@skytech/manager/common/entities/customer-head-frame-agreement.entity';

@Injectable()
export class DrillDownService {
  constructor(
    @InjectRepository(ManagerAccessFrameAgreementViewEntity)
    readonly macFrameAgreementRepository: Repository<ManagerAccessFrameAgreementViewEntity>,
    @InjectRepository(ManagerAccessDepartmentView)
    readonly madRepository: Repository<ManagerAccessDepartmentView>,
  ) {}

  async getCustomerAccessList(userId: number): Promise<string> {
    const macFrameAgreement = await this.macFrameAgreementRepository.find({
      where: { userId },
      select: ['customerId'],
    });

    return macFrameAgreement.map((item) => item.customerId).join(',');
  }

  async getCustomerAccessListArr(user: Express.GenericUser): Promise<number[]> {
    const { role, uid: userId, cid } = user;

    if (['admin', 'customer_head_admin'].includes(role)) {
      const macFrameAgreement = await this.macFrameAgreementRepository.find({
        where: { userId },
        select: ['customerId'],
      });

      return macFrameAgreement.map((item) => item.customerId);
    } else {
      return [cid];
    }
  }

  async getDepartmentAccessList(userId: number): Promise<number[]> {
    const mad = await this.madRepository.find({
      where: { userId },
      select: ['departmentId'],
    });

    return mad.map((item) => item.departmentId);
  }

  getPeriodFilter(year: number, period: number): string {
    return period <= 0
      ? `AND YEAR(i.date) = ${year}`
      : `AND (YEAR(i.date) = ${year} AND MONTH(i.date) = ${period})`;
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

  joinCustomer = (
    query: SelectQueryBuilder<any>,

    condition: string,
    parameters?: Record<string, any>,
  ) => {
    query.innerJoin(CustomerEntity, 'c', condition, parameters);
  };

  joinCustomerHead = (
    query: SelectQueryBuilder<any>,
    condition: string,
    parameters?: Record<string, any>,
  ) => {
    query.innerJoin(CustomerHeadEntity, 'ch', condition, parameters);
  };

  joinCustomerHeadFrameAgreement = (
    query: SelectQueryBuilder<any>,
    condition: string,
    parameters?: Record<string, any>,
  ) => {
    query.leftJoin(
      CustomerHeadFrameAgreementEntity,
      'chfa',
      condition,
      parameters,
    );
  };

  getOrgFilterJoin(
    query: SelectQueryBuilder<any>,
    frameAgreementId: number,
    customerHeadId: number,
    customerId: number,
  ) {
    customerId
      ? this.joinCustomer(
          query,
          'c.id = i.customer_id AND c.id = :customerId',
          { customerId },
        )
      : this.joinCustomer(query, 'c.id = i.customer_id');

    customerHeadId
      ? this.joinCustomerHead(
          query,
          'c.customer_head_id = ch.id AND ch.id = :customerHeadId',
          { customerHeadId },
        )
      : this.joinCustomerHead(query, 'c.customer_head_id = ch.id');

    frameAgreementId
      ? this.joinCustomerHeadFrameAgreement(
          query,
          'ch.customer_head_frame_agreement_id = chfa.id AND chfa.id = :frameAgreementId',
          { frameAgreementId },
        )
      : this.joinCustomerHeadFrameAgreement(
          query,
          'ch.customer_head_frame_agreement_id = chfa.id',
        );
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
    user: Express.GenericUser,
    type: DrillDownServiceType,
    typeId: number,
  ) => {
    const customerAccessListArr = await this.getCustomerAccessListArr(user);

    const customerAccessList = customerAccessListArr.join(',');

    if (type === DrillDownServiceType.FRAME_AGREEMENT) {
      return (
        await this.macFrameAgreementRepository.query(
          `SELECT customer_head_frame_agreement_id AS id, customer_head_frame_agreement_name AS name FROM view.customer WHERE id IN(${customerAccessList}) AND customer_head_frame_agreement_id = ? LIMIT 1`,
          [typeId],
        )
      )[0];
    }

    if (type === DrillDownServiceType.CUSTOMER_HEAD) {
      return (
        await this.macFrameAgreementRepository.query(
          `SELECT customer_head_id AS id, customer_head_name AS name FROM view.customer WHERE id IN(${customerAccessList}) AND customer_head_id = ? LIMIT 1`,
          [typeId],
        )
      )[0];
    }

    if (type === DrillDownServiceType.CUSTOMER) {
      return (
        await this.macFrameAgreementRepository.query(
          `SELECT id, name FROM control.customer WHERE id IN(${customerAccessList}) AND id = ? LIMIT 1`,
          [typeId],
        )
      )[0];
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

  timeFormat(seconds: number): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds / 60) % 60);
    const remainingSeconds: number = Math.floor(seconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  calculateQuantity(item: any) {
    switch (item.priceType) {
      case 'T':
        return `${Math.round(item.quantity)} stk - ${this.timeFormat(
          item.peak_volume_diff,
        )}`;
      case 'D':
        return `${item.peak_volume_diff / 1024 / 1024}`;
      case 'Q':
      case 'O':
      case 'S':
        return `${Math.round(item.quantity)}`;
      default:
        return `${item.quantity}`;
    }
  }
}
