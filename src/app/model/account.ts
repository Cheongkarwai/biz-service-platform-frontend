export interface Account {
  businessId: string;
  customerId: string;
  id: string;
  status: string;
  type: AccountType;
}

export type AccountType = 'PERSONAL' | 'BUSINESS';
