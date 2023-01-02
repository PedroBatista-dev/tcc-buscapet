export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isOng: boolean;
  cpf: string | undefined;
  cnpj: string | undefined;
}
