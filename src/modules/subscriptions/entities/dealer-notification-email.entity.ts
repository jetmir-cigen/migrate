import { Column, Entity, Index } from 'typeorm';

@Index(
  'dealer_notification_email_dealer_customer_id_uindex',
  ['dealerCustomerId'],
  { unique: true },
)
@Entity('dealer.notification_email')
export class DealerNotificationEmailEntity {
  @Column('int', { primary: true, name: 'dealer_customer_id' })
  dealerCustomerId: number;

  @Column('text', {
    name: 'email_addresses',
    nullable: true,
    comment: 'comma separated',
  })
  emailAddresses: string | null;

  @Column('text', {
    name: 'phone_numbers',
    nullable: true,
    comment: 'comma separated',
  })
  phoneNumbers: string | null;
}
