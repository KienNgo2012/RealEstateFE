import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RoleTypeEnum } from 'src/app/enums/role-type.enum';
import { UserRoleService } from 'src/app/services/userRole.service';


@Component({
  selector: 'app-edit-user-roles',
  templateUrl: './edit-user-roles.component.html',
  styleUrls: ['./edit-user-roles.component.css']
})


export class EditUserRolesComponent {

  constructor(
    private fb: FormBuilder,
    private userRoleService: UserRoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public dialogref: MatDialogRef<EditUserRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  
  @Input()
  id!: string;
  rolecodes = RoleTypeEnum.All;
  message: string = ''; 
  roleee!: string;

  form = this.fb.group({
    id: [0, Validators.required],
    username: ['', Validators.required],
    rolecode: [RoleTypeEnum.admin.code, Validators.required],
    fullname: ['', Validators.required],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.loadData();
    });
  }
  //load data
  loadData() {
      if (this.data != null) {
        this.form.patchValue(this.data);
      }
  }
//Update
  Update() {
    if (!this.form.valid) {
      return;
    }
    const model = this.form.getRawValue();
    this.userRoleService.Update(model as any).subscribe((data) => {
      if (data.isSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update role successfully!',
        });
        this.dialogref.close();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: data.message,
        });
      }
    });
  }
  //Close dialog
  Close(){
    this.dialogref.close();
  }
}



