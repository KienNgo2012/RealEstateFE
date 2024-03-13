import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.dto';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TransactionDto } from '../models/transaction/transaction.dto';
import { TransactionReq } from '../models/transaction/transaction-req.dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  getAllTransaction(): Observable<ApiResponse<TransactionDto[]>> {
    return this.http.get<ApiResponse<TransactionDto[]>>(
      `${this.apiUrl}/transaction/getAllTransaction`
    );
  }

  getTransactionByProperties(IdProperties:any): Observable<ApiResponse<TransactionDto[]>> {
    return this.http.get<ApiResponse<TransactionDto[]>>(
      `${this.apiUrl}/transaction/getTransactionByProperties?IdProperties=${IdProperties}`
    );
  } 

  getTransactionByUser(IdUser:any): Observable<ApiResponse<TransactionDto[]>> {
    return this.http.get<ApiResponse<TransactionDto[]>>(
      `${this.apiUrl}/transaction/getTransactionByUser?IdUser=${IdUser}`
    );
  } 

  updateTransaction(idTransaction: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/transaction/updateTransaction?idTransaction=${idTransaction}&status=${status}`;
    return this.http.put<any>(url, null);
  }

  createTransaction(transaction: TransactionReq) : Observable<ApiResponse<string>> {
    const url = `${this.apiUrl}/transaction`;
    return this.http.post<ApiResponse<string>>(url, transaction).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
