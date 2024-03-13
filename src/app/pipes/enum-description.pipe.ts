import { Pipe, PipeTransform } from "@angular/core";
import { BaseTypeEnum } from "../enums/base-type.enum";

@Pipe({
    name: 'enumDescription'
})
export class EnumDescriptionPipe implements PipeTransform {
    transform(value: string, types: BaseTypeEnum[]) {
        const e = types.filter(t => t.code == value);
        if(e[0]) {
            return e[0].name;
        }

        return '';
    }
}