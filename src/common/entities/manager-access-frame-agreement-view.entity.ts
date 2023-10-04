import { Column, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'view_manager_access_frame_agreement',
  expression: `
    SELECT 
      u.id AS user_id,
      u.username,
      u.first_name,
      u.last_name,
      view.ac.customer_head_frame_agreement_id,
      view.ac.customer_head_frame_agreement_name,
      view.ac.id AS customer_id,
      view.ac.name AS customer_name,
      view.ac.customer_head_id,
      view.ac.customer_head_name
    FROM (
      control.user u
      JOIN control.usergroup ug ON u.usergroup_id = ug.id
      JOIN view.customer c ON view.c.id = u.customer_id
    )
    LEFT JOIN view.customer ac ON (
      (
        (ug.name = 'admin' OR u.has_frame_agreement_access = 1)
        AND (
          view.ac.customer_head_id = view.c.customer_head_id
          OR view.c.customer_head_frame_agreement_id = view.ac.customer_head_frame_agreement_id
        )
      )
      OR (
        ug.name = 'customer_head_admin'
        AND view.ac.customer_head_id = view.c.customer_head_id
      )
      OR (
        ug.name = 'customer_admin'
        AND u.customer_id = view.ac.id
      )
    )
    WHERE (
      ug.name IN ('customer_admin', 'customer_head_admin', 'admin')
      AND view.c.status IN (1, 5)
    )
  `,
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
