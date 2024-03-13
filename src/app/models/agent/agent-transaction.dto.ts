export class AgentTransactionDto {
  id!: number|undefined;
  idproperties!: number|undefined;
  idBuyer!: number|undefined;
  idSeller!: number|undefined;
  username!: string;
  email?: string;
  phoneNumber!: string;
  address?: string;
  title!: string;
  avatar?: string;
  status!: string;
}

export interface UserInfo {
  id: number|undefined;
  name?: string;
  image?: string;
  value?: string;
}
