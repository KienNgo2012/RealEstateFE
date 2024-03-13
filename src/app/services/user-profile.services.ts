import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.dto';
import {catchError, tap} from "rxjs/operators";
import { UserProfileReq } from '../models/userprofile/userprofile-req.dto';
import { Observable } from 'rxjs';
import { LoginResDto } from '../models/authentication/login-res.dto';
import { AgentTransactionDto } from '../models/agent/agent-transaction.dto';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServices {
  apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  updateAvatar(avatar: FormData){
    const url = `${this.apiUrl}/userInfo/updateAvatar`;
    return this.http.put<ApiResponse<string>>(`${url}`, avatar).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  changePassword(oldPassword:string, newPassword:string, confirmedPassword:string){
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmedPassword: confirmedPassword
    };
    const url = `${this.apiUrl}/userInfo/changePassword`;
    return this.http.put<ApiResponse<string>>(`${url}`, body).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  updateUser(req: UserProfileReq): Observable<any> {
    return this.http.put(`${this.apiUrl}/userInfo/updateUser`, req);
  }
  
  getUserProfile(): Observable<ApiResponse<LoginResDto>> {
    return this.http.get<ApiResponse<LoginResDto>>(`${this.apiUrl}/userInfo/getUserProfile`);
  }

  getTransactrionsByIdUser(id: any): Observable<ApiResponse<AgentTransactionDto[]>> {
    return this.http.get<ApiResponse<AgentTransactionDto[]>>(
      `${this.apiUrl}/userInfo/getHistoryTransaction/${id}`
    );
  }
}
