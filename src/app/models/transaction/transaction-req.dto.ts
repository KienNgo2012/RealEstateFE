export class TransactionReq {
    IdProperties!: number|undefined;
    IdBuyer!: number|undefined;
    IdSeller!: number|undefined;
    Price!: number|undefined;
    Date!: Date|null;;
    Status!: string;
}