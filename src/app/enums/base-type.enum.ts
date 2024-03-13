export class BaseTypeEnum {
    code!: string;
    name!: string;
    static All: BaseTypeEnum[] = [];

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }
}