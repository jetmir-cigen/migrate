import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity({ name: 'control.subscription_service_order_activation' });
export class SubscriptionServiceOrderActivationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'department_id' })
  departmentId: number;

  @Column({ nullable: true, name: 'name_company' })
  nameCompany: string;

  @Column({ nullable: true, name: 'birthdate_org_no' })
  birthdateOrgNo: string;

  @Column({ nullable: true, name: 'phone_no' })
  phoneNo: string;

  @Column({ default: 47, name: 'phone_no_country_id' })
  phoneNoCountryId: number;

  @Column({ nullable: true, name: 'vendor_old' })
  vendorOld: number;

  @Column({ nullable: true, name: 'vendor_new' })
  vendorNew: number;

  @Column({ nullable: true, name: 'name_new' })
  nameNew: string;

  @Column({ nullable: true, name: 'id_number' })
  idNumber: string;

  @Column({ nullable: true, name: 'personal_id' })
  personalId: string;

  @Column({ nullable: true, name: 'sim_number' })
  simNumber: string;

  @Column({ default: 0, name: 'new_sim' })
  newSim: boolean;

  @Column({ nullable: true, name: 'data_sim_number' })
  dataSimNumber: string;

  @Column({ default: 0, name: 'new_data_sim' })
  newDataSim: boolean;

  @Column({ default: 0, name: 'new_twin_sim' })
  newTwinSim: boolean;

  @Column({ nullable: true, name: 'sim_name' })
  simName: string;

  @Column({ nullable: true, name: 'sim_adr' })
  simAdr: string;

  @Column({ nullable: true, name: 'sim_zip' })
  simZip: string;

  @Column({ nullable: true, name: 'sim_city' })
  simCity: string;

  @Column({ nullable: true, name: 'activation_date' })
  activationDate: Date;

  @Column({ nullable: true, name: 'code' })
  code: string;

  @Column({ nullable: true, name: 'new_number' })
  newNumber: boolean;

  @Column({ nullable: true, name: 'type' })
  type: string;

  @Column({ nullable: true, name: 'email' })
  email: string;

  @Column({ nullable: true, name: 'employee_number' })
  employeeNumber: string;

  @Column({ default: 0, name: 'business_sub' })
  businessSub: boolean;

  @Column({ nullable: true, name: 'authorization_file_mime' })
  authorizationFileMime: string;

  @Column({ nullable: true, name: 'authorization_file_content' })
  authorizationFileContent: string;

  @Column({ nullable: true, name: 'contact_number' })
  contactNumber: string;

  @Column({ default: 47, name: 'contact_number_country_id' })
  contactNumberCountryId: number;

  @Column({ nullable: true, name: 'document_id' })
  documentId: number;

  @Column({ nullable: true, name: 'user_submission' })
  userSubmission: Date;

  @Column({ nullable: true, name: 'device_policy_id' })
  devicePolicyId: number;

  @Column({ nullable: true, name: 'salary_deduction_profile_id' })
  salaryDeductionProfileId: number;

  @Column({ nullable: true, name: 'ecom_policy_id_list' })
  ecomPolicyIdList: string;

  @Column({ name: 'subscription_service_order_activation_guid' })
  subscriptionServiceOrderActivationGuid: string;
}
