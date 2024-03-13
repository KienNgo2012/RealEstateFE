import { Injectable, OnDestroy } from '@angular/core';
import { UserDto } from '../models/authentication/user.dto';
import { LoginReqDto } from '../models/authentication/login-req.dto';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiResponse } from '../models/api-response.dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoginResDto } from '../models/authentication/login-res.dto';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router, private messageService : MessageService) {}

  apiUrl = `${environment.baseUrl}`;
  TOKEN_NAME = 'Token';
  USER_INFO = 'UserInfo';

  private authChangeSub = new ReplaySubject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  timoutId: any = null;

  login(model: LoginReqDto): Observable<ApiResponse<LoginResDto>> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<ApiResponse<LoginResDto>>(url, model).pipe(
      tap((rs) => {
        if (rs.isSuccessful) {
          // Login successfully: Save token to storage
          this.setAuthenticationInfo(rs.data);
          this.autoLogout();
        } else {
          // Login fail: Clean token
          this.setAuthenticationInfo(undefined);
        }
      }),
      catchError((err) => {
        // Error happend: Clean token
        this.setAuthenticationInfo(undefined);
        throw err;
      })
    );
  }

  logout() {
    // Clean token in storage
    this.setAuthenticationInfo(undefined);
  }

  public setAuthenticationInfo(loginResDto: LoginResDto | undefined) {
    const isAuthenticated = !!loginResDto;
    localStorage.setItem(
      this.TOKEN_NAME,
      isAuthenticated ? `Bearer ${loginResDto?.token}` : ''
    );

    const user = isAuthenticated
      ? new UserDto(loginResDto?.id, loginResDto?.username,loginResDto?.fullname, loginResDto?.role, loginResDto?.avatar, loginResDto?.sex, loginResDto?.dateOfBirth, loginResDto?.adress, loginResDto?.email, loginResDto?.phoneNumber)
      : null;
    localStorage.setItem(this.USER_INFO, JSON.stringify(user));

    this.authChangeSub.next(isAuthenticated);
  }

  public getAuthorizationToken(): string {
    return localStorage.getItem(this.TOKEN_NAME) ?? '';
  }

  public getUserInfo(): UserDto | null {
    const user = localStorage.getItem(this.USER_INFO);
    if (!user) {
      return null;
    } else {
      return JSON.parse(user) as any;
    }
  }

  public autoLogin(): void {
    const token = this.getAuthorizationToken();
    var validToken = !!token && this.decodeToken(token) > 0;
    if (!validToken) {
      this.setAuthenticationInfo(undefined);
    } else {
      this.autoLogout();
    }

    this.authChangeSub.next(validToken);
  }

  public autoLogout() {
    const remainTime = this.decodeToken(this.getAuthorizationToken());
    if (this.timoutId) {
      clearTimeout(this.timoutId);
    }

    this.timoutId = setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Logout',
        detail: 'Session is expired!'
      });

      this.setAuthenticationInfo(undefined);
      this.router.navigate(['/home']);
    }, remainTime);
  }

  decodeToken(token: string): number {
    try {
      const val = jwtDecode(token);
      const remainTimeInMs = (val.exp ?? 0) * 1000 - Date.now();

      return remainTimeInMs >= 0 ? remainTimeInMs : 0;
    } catch (error) {
      console.error('Invalid token: ', error);

      return 0;
    }
  }
}
