import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.dto';
import { Observable } from 'rxjs';
import { TransactionAdmin } from '../models/transaction/transaction-admin.dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionAdminService {

  apiUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) { }

  // READ
  getAll(): Observable<ApiResponse<TransactionAdmin[]>> {
    return this.http.get<ApiResponse<TransactionAdmin[]>>(`${this.apiUrl}/transaction/getall`)
  }

}



