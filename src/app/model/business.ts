import {Speciality} from './service';

export interface Business {
  id: string;
  name: string;
  overview: string;
  email: string;
  mobileNumber: string;
  logo: string;
  approvalStatus: ApprovalStatus;
}


export interface BusinessInput{
  name: string;
  mobileNumber: string;
  email: string;
  overview: string;
  addresses: Address[];
  services: Speciality[];
}

export interface Address{

  street: string;
  city: string;
  state: string;
  zip: string;
  type: AddressType
}

export type AddressType = 'MAILING' | 'RESIDENTIAL' | 'BUSINESS';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
