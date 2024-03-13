import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/models/authentication/user.dto';
import { UserProfileReq } from 'src/app/models/userprofile/userprofile-req.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserProfileServices } from 'src/app/services/user-profile.services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent {
  // authenticatedSubscription: Subscription;
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  userProfile: UserProfileReq = {
    Fullname: '', Email:'', PhoneNumber:'', DateOfBirth:'',Sex:'',Adress:''
  };
  USER_INFO = 'UserInfo';
  oldPassword='';
  newPassword='';
  confirmedPassword='';

  constructor(
    private http: HttpClient, 
    private authenService: AuthenticationService,
    private userProfileServices: UserProfileServices,
    private messageService: MessageService

    ) {
  this.getUserProfile();
  }
  updateUser(){
    this.userProfileServices.updateUser(this.userProfile).subscribe((data) => {
      if (data.isSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update user profile successfully!',
        });
        this.getUserProfile()
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Update user profile failed!',
          detail: data.message,
        });
      }
    });
  }
  changePassword(){
    this.userProfileServices.changePassword(this.oldPassword, this.newPassword, this.confirmedPassword).subscribe((data) => {
      if (data.isSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Change password successfully!',
        });
        this.getUserProfile()
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Change password failed!',
          detail: data.message,
        });
      }
    });
  }

  getUserProfile(){
    this.userProfileServices.getUserProfile().subscribe((data) => {
      if (data.isSuccessful) {
        this.userProfile.Fullname = data.data?.fullname;
        this.userProfile.Email = data.data?.email;
        this.userProfile.PhoneNumber = data.data?.phoneNumber;
        this.userProfile.DateOfBirth = data.data?.dateOfBirth;
        this.userProfile.Sex = data.data?.sex;
        this.userProfile.Adress = data.data?.adress;
        this.updateUserInfo(
          this.userProfile.Fullname!,
          this.userProfile.Adress!,
          this.userProfile.Email!,
          this.userProfile.PhoneNumber!,
          this.userProfile.DateOfBirth!,
          this.userProfile.Sex!,
          this.userProfile.Adress!,
          );
      } 
    });
  }
   //update lại local storage
  updateUserInfo(fullname: string, adress: string, email:string, phoneNumber:string, dateofbirth:string, sex:string, address:string): void {
    const storedUserJson = localStorage.getItem(this.USER_INFO);
    const user: UserDto = storedUserJson ? JSON.parse(storedUserJson) : null;
  
    if (user) {
      user.fullname = fullname;
      user.adress = adress;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.dateofbirth = dateofbirth;
      user.adress = address;
      user.sex = sex;
      localStorage.setItem(this.USER_INFO, JSON.stringify(user));
    }
  }

}
