import { Component } from '@angular/core';
import { RegisterService }  from 'src/app/services/register.service';
import { RegisterDto } from 'src/app/models/register/register-req.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  message: string = ''; 

  constructor(
    private registerService: RegisterService  ,
    private messageService: MessageService

    ) {}
  user: RegisterDto = { username: '', phoneNumber: '', fullname: '' , email: '' , passWord: '' , confirmPassWord: '' };

  validateEmail(email:string) {
    // Biểu thức chính quy cho kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Kiểm tra xem địa chỉ email có phù hợp với biểu thức chính quy hay không
    return emailRegex.test(email);
  }

  validatePhoneNumber(phoneNumber: string) {
    // Biểu thức chính quy cho kiểm tra định dạng số điện thoại
    const phoneRegex = /^\d{10}$/;
    // Kiểm tra xem số điện thoại có phù hợp với biểu thức chính quy hay không
    return phoneRegex.test(phoneNumber);
  }

  registerUser() {
    if(this.user.username == ""){
      this.message="Username is required";
    }
    if(this.user.fullname == ""){
      this.message="Full name is required";
    }
     else if(!this.validatePhoneNumber(this.user.phoneNumber)){
      this.message="Phone number is not valid";
    }
    else if(!this.validateEmail(this.user.email)){
      this.message="Email address is not valid";
    }
    else if(this.user.passWord != this.user.confirmPassWord){
      this.message="Passwords do not match";
    }

    else{
      this.message="";
      this.registerService.registerUser(this.user).subscribe((data) => {
        if (data.isSuccessful) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Register account successfully!',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Create account failed!',
            detail: data.message,
          });
        }
      });
    }
  }
}
