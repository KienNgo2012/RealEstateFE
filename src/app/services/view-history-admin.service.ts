import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.dto';
import { Observable } from 'rxjs';
import { ViewHistoryAdmin } from '../models/admin/view-history-admin.dto';

@Injectable({
  providedIn: 'root'
})
export class ViewHistoryAdminService {

  apiUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) { }

  // READ
  getAll(): Observable<ApiResponse<ViewHistoryAdmin[]>> {
    return this.http.get<ApiResponse<ViewHistoryAdmin[]>>(`${this.apiUrl}/viewhistory/getall`)
  }

}



