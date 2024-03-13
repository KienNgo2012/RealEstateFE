import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { error } from 'protractor';
import { LoginReqDto } from 'src/app/models/authentication/login-req.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: LoginReqDto = { username: '', password: '' };
checkCapcha: boolean = false;
protected aFormGroup!: FormGroup;
siteKey:string="6Ld_ZlIpAAAAABSCEwhf4lypIMevFET9Ok1rg7Dm";
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.aFormGroup.valid) {
      this.authService.login(this.user).subscribe({
        next: (rs) => {
          if (rs.isSuccessful) {
            this.router.navigate(['/home']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Login failed!',
              detail: rs.message,
            });
          }
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please check captcha!',
      });
    }
     
  }
}
