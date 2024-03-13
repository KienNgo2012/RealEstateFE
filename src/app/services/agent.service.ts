import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiResponse} from "../models/api-response.dto";
import {PropertiesDto} from "../models/properties/properties.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {AgentTransactionDto} from "../models/agent/agent-transaction.dto";
import {TransactionDto} from "../models/transaction/transaction.dto";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  apiUrl = `${environment.baseUrl}`;
  selectedRowData: any;

  constructor(private http: HttpClient) { }

  getPropertiesByIdUser(id: any): Observable<ApiResponse<PropertiesDto[]>> {
    return this.http.get<ApiResponse<PropertiesDto[]>>(
      `${this.apiUrl}/agent/getproperties/${id}`
    );
  }

  deletePropertiesByIdProperties(id: any): Observable<ApiResponse<PropertiesDto[]>> {
    return this.http.delete<ApiResponse<PropertiesDto[]>>(
      `${this.apiUrl}/agent/deleteProperties/${id}`
    ).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  updateProperties(propertiesData: FormData){
    const url = `${this.apiUrl}/agent/updateProperties`;
    // const headers = { Authorization: ` ${token}` };
    return this.http.put<ApiResponse<string>>(`${url}`, propertiesData).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  updateTransactinStatus(id: any): Observable<ApiResponse<TransactionDto[]>> {
    return this.http.put<ApiResponse<TransactionDto[]>>(
      `${this.apiUrl}/agent/updateTransactrionsStatus/${id}`, id
    ).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  deleteTransactinStatus(id: any): Observable<ApiResponse<TransactionDto[]>> {
    return this.http.delete<ApiResponse<TransactionDto[]>>(
      `${this.apiUrl}/agent/deleteTransactionsStatus/${id}`
    ).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  getTransactrionsByIdUser(id: any): Observable<ApiResponse<AgentTransactionDto[]>> {
    return this.http.get<ApiResponse<AgentTransactionDto[]>>(
      `${this.apiUrl}/agent/gettrancsactions/${id}`
    );
  }

  setSelectedRowData(data: any): void {
    this.selectedRowData = data;
  }

  getSelectedRowData(): any {
    return this.selectedRowData;
  }
}
