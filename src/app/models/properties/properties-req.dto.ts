import { DecimalPipe } from "@angular/common";

export class PropertiesReq {
    idUser!: number|undefined;
    title!: string;
    category!: string;
    categoryDetail!: string;
    province!: string;
    district!: string;
    wards!: string;
    houseNumber!: string;
    acreage!: number;
    image!: string;
    imageFile!: File|null;
    price!: number;
    description!: string;
    createDate!: Date|null;
    status!: string;
}