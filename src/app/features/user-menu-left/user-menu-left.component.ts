import { Component, OnDestroy } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserDto} from "../../models/authentication/user.dto";
import {Subscription} from "rxjs";
import { UserProfileServices } from 'src/app/services/user-profile.services';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-menu-left',
  templateUrl: './user-menu-left.component.html',
  styleUrls: ['./user-menu-left.component.css']
})
export class UserMenuLeftComponent implements OnDestroy {
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  authenticatedSubscription: Subscription;
  showSelector: boolean = true;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  USER_INFO = 'UserInfo';

  constructor(
    private authenService: AuthenticationService,
    private userProfileServices: UserProfileServices,
    private messageService: MessageService,

    private router: Router
  ) {
    this.authenticatedSubscription = this.authenService.authChanged.subscribe(
      (rs) => {
        this.isUserAuthenticated = rs;
        this.user = this.authenService.getUserInfo();
      }
    );
  }

  ngOnDestroy(): void {
    this.authenticatedSubscription.unsubscribe();
  }
  onMenuItemClick(route: string) {
    this.router.navigate([route]);
  }
  // select image of properties 
  onFileSelected(event: any) {
    const formData = new FormData();

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
  
      if (file instanceof File) {
        this.selectedFile = file;
        // Hiển thị ảnh sau khi chọn
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
    else {
      this.selectedFile = null;
    }
    if (this.selectedFile !== null && this.selectedFile !== undefined) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }

    this.userProfileServices.updateAvatar(formData).subscribe((data) => {
      if (data.isSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update avatar successfully!',
        });
        this.updateUserInfo( this.imagePreview!);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Update avatar failed!',
          detail: data.message,
        });
      }
    });
  }
    //update lại local storage
    updateUserInfo(avatar: string): void {
      const storedUserJson = localStorage.getItem(this.USER_INFO);
      const user: UserDto = storedUserJson ? JSON.parse(storedUserJson) : null;
    
      if (user) {
        user.avatar = avatar;
        localStorage.setItem(this.USER_INFO, JSON.stringify(user));
      }
    }
}
