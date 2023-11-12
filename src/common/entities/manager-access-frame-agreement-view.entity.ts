import { Column, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'view.manager_access_frame_agreement',
})
export class ManagerAccessFrameAgreementViewEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'customer_head_frame_agreement_id' })
  customerHeadFrameAgreementId: number;

  @Column({ name: 'customer_head_frame_agreement_name' })
  customerHeadFrameAgreementName: string;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'customer_name' })
  customerName: string;

  @Column({ name: 'customer_head_id' })
  customerHeadId: number;

  @Column({ name: 'customer_head_name' })
  customerHeadName: string;
}
