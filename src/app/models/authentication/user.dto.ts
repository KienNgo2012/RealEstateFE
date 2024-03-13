export class UserDto {
  constructor(id: number, username: string, fullname:string, role: string,avatar:string, sex:string,
    dateofbirth:string , adress:string, email:string, phoneNumber:string) {
    this.id = id;
    this.username = username;
    this.fullname = fullname;
    this.role = role;
    this.avatar= avatar;
    this.sex= sex;
    this.dateofbirth= dateofbirth;
    this.adress= adress;
    this.email= email;
    this.phoneNumber= phoneNumber;

  }

  id!: number;
  username!: string;
  fullname!: string;
  role!: string;
  avatar!: string|null;
  sex!: string;
  dateofbirth!: string;
  adress!: string;
  email!: string;
  phoneNumber!: string;
}
