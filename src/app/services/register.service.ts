import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.dto';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  registerUser(userData: any) : Observable<ApiResponse<string>> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<ApiResponse<string>>(url, userData).pipe(
      tap((rs) => {
      
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }}
