import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PropertiesDto } from '../models/properties/properties.dto';
import { ApiResponse } from '../models/api-response.dto';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserAdminDto } from '../models/admin/user-admin.dto';
import { UserRoleDto } from '../models/admin/user-role.dto';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  apiUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) { }

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh() {
    return this._refreshrequired;
  }
  // READ
  getAll(): Observable<ApiResponse<UserAdminDto[]>> {
    return this.http.get<ApiResponse<UserAdminDto[]>>(`${this.apiUrl}/userRole/getall`)
  }

  getById(id: string): Observable<ApiResponse<UserAdminDto>> {
    return this.http.get<ApiResponse<UserAdminDto>>(`${this.apiUrl}/userRole/get-by-id/${id}`);
  }

//Update
  Update(userRoleData: UserRoleDto): Observable<ApiResponse<string>> {
    const url = `${this.apiUrl}/userRole/update`;
    return this.http.put<ApiResponse<string>>(url, userRoleData).pipe(
      tap((rs) => {
        this.RequiredRefresh.next();
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}



