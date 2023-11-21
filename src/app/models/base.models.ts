export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  company?: string;
  code?: string;
  note?: string;
}

export class User implements IUser {
  constructor(id?: number,
              username?: string,
              email?: string,
              company?: string,
              code?: string,
              note?: string) {
  }
}

export type TagName = 'Important' | 'Customer' | 'Lead' | 'Supplier';

export interface IPeopleOrganizationUnit {
  id?: number;
  summary?: string;
  email?: string;
  phone?: string;
  location?: string;
  tags?: TagName[];
}

export class PeopleOrganizationUnit implements IPeopleOrganizationUnit {
  constructor(id?: number,
              summary?: string,
              email?: string,
              phone?: string,
              location?: string,
              tags?: TagName[]) {
  }
}
