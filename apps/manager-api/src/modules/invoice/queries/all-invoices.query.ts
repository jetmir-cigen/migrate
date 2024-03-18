import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { nameof } from '@skytech/manager/utils/nameof';
import { VendorEntity } from '@skytech/manager/common/entities/vendor.entity';
import { CustomerEntity } from '@skytech/manager/modules/customer/entities/customer.entity';

type QueryFilters = {
  userId: number;
};

export class FindInvoicesByFilterQuery {
  constructor(public readonly filters: QueryFilters) {}
}

@QueryHandler(FindInvoicesByFilterQuery)
export class FindInvoicesByFilterQueryHandler
  implements IQueryHandler<FindInvoicesByFilterQuery>
{
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async execute({ filters }: FindInvoicesByFilterQuery) {
    const { userId } = filters;

    const invoices = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .select(
        nameof<InvoiceEntity>(
          [
            'customer',
            'customerId',
            'date',
            'dueDate',
            'ehfStatus',
            'elementLabel',
            'elementLabelId',
            'id',
            'invoiceAmount',
            'invoiceClassificationId',
            'invoiceControlAmount',
            'invoiceNo',
            'invoiceRecipient',
            'kidnumber',
            'lastUpdate',
            'sent',
            'vendor',
            'vendorGrossAmount',
            'vendorId',
          ],
          'invoice.',
        ),
      )
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('vi.id')
          .from('view.invoice', 'vi')
          .addFrom('view.manager_access_customer', 'mac')
          .where('mac.user_id = :userId', { userId })
          .andWhere('mac.customer_id = vi.customer_id')
          .andWhere('invoice.id = vi.id')
          // .andWhere('vi.vendor_id = :customerId', { customerId })
          .getQuery();
        return 'invoice.id IN ' + subQuery;
      })
      .leftJoin('invoice.vendor', 'vendor')
      .addSelect(
        nameof<VendorEntity>(
          [
            'address1',
            'address2',
            'city',
            'countryId',
            'id',
            'name',
            'orgNo',
            'zip',
            'isInternalVendor',
          ],
          'vendor.',
        ),
      )
      .leftJoin('invoice.customer', 'customer')
      .addSelect(
        nameof<CustomerEntity>(
          [
            'address1',
            'address2',
            'billingAddress1',
            'billingAddress2',
            'billingCity',
            'billingCycleMonths',
            'billingZip',
            'city',
            'countryId',
            'customerHeadId',
            'customerNo',
            'customerStatus',
            'id',
            'locale',
            'name',
            'orgNo',
            'vatNo',
            'whitelabelId',
            'zip',
          ],
          'customer.',
        ),
      )
      .leftJoinAndSelect('invoice.elementLabel', 'elementLabel')
      .orderBy('invoice.date', 'DESC')
      .getMany();

    return invoices;
  }
}
