export class TransactionDto {
    id!: number|undefined;
    idProperties!: number|undefined;
    idBuyer!: number|undefined;
    idSeller!: number|undefined;
    price!: number|undefined;
    date!: string;
    status!: string;
}