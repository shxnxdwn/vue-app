export type AccountLabel = {
  text: string;
};

export type AccountType = 'LDAP' | 'Локальная';

export type Account = {
  id: number;
  labels: AccountLabel[];
  type: AccountType;
  login: string;
  password: string | null;
};
