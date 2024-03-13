import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleTypeEnum } from 'src/app/enums/role-type.enum';
import { UserRoleDto } from 'src/app/models/admin/user-role.dto';
import { UserRoleService } from 'src/app/services/userRole.service';
import { EditUserRolesComponent } from '../edit-user-roles/edit-user-roles.component';
import { UserAdminDto } from 'src/app/models/admin/user-admin.dto';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent {

  userroles: UserAdminDto[] = [];
  roleTypes = RoleTypeEnum.All;
  selectedRole: UserRoleDto | null = null;
  showRole: boolean = false;
  usernamesearch: string = '';

  constructor(
    private userRoleService: UserRoleService,
    public dialog: MatDialog,

  ) { }

//Init
  ngOnInit(): void {
    this.getAll();
    this.userRoleService.RequiredRefresh.subscribe(r => {
      this.getAll();
    });
  }
//Get All
  getAll() {
    this.userRoleService.getAll().subscribe((data) => {
      if (data.isSuccessful) {
        this.userroles = data.data ?? [];
      } else {
      }
    });
  }
//Update
  update(userrole: UserRoleDto) {
    this.selectedRole = userrole;
    this.showRole = true;

    const dialogRef = this.dialog.open(EditUserRolesComponent, {
      width: "50%",
      data: userrole
    });
  }
//Search
  Search() {
    if (this.usernamesearch != "") {
      // Sử dụng filter để lọc người dùng theo username
      this.userroles = this.userroles.filter(userrole =>
        userrole.username.toLowerCase().includes(this.usernamesearch.toLowerCase())
      );
    } else {
      this.ngOnInit();
    }
  }
}
