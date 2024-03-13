import { BaseTypeEnum } from "./base-type.enum";

export class RoleTypeEnum extends BaseTypeEnum {
    static normal = new RoleTypeEnum('normal', 'Normal');
    static admin = new RoleTypeEnum('admin', 'Admin');
    static agent = new RoleTypeEnum('agent', 'Agent');

    static override All = [
        this.normal,
        this.admin,
        this.agent
    ];
}