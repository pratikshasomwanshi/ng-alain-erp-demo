export interface Contact {
  id: number;
  contactCode: string;
  fullName: string;
  mobile: string;
  email: string;
  contactType: 'Customer' | 'Supplier' | 'Employee';
  status: 'Active' | 'Inactive';
  createdDate: string;
}
