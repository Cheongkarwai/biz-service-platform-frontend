import {Speciality} from './service';
import {Address, ApprovalStatus} from './business';

export interface BusinessDetails {
  id: string;
  name: string;
  overview: string;
  email: string;
  mobileNumber: string;
  addresses: Address[];
  services: Speciality[];
  logo: string;
  approvalStatus: ApprovalStatus;
  documents: BusinessDocument[];
}

export interface BusinessDocument{
  key: string;
  bucket: string;
}
