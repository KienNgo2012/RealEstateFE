import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PropertiesDto } from '../models/properties/properties.dto';
import { ApiResponse } from '../models/api-response.dto';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { propertiesDetailRes } from '../models/properties/propertiesDetailRes';
import { SearchProperties } from '../models/properties/searchProperties';
import { ViewHistoryReq } from '../models/properties/viewhistory.dto';
import { CommentRes } from '../models/properties/commentRes.dto';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  getTransactionByProperties(id: string) {
    throw new Error('Method not implemented.');
  }

  apiUrl = `${environment.baseUrl}`;
  provincesURL = 'assets/provinces.json'; 
  categoryURL = 'assets/category.json'; 

  constructor(private http: HttpClient) { }
  
  getPropertiesBy(req: SearchProperties): Observable<ApiResponse<PropertiesDto[]>> {
    return this.http.post<ApiResponse<PropertiesDto[]>>(`${this.apiUrl}/properties`, req);
  }
  // READ
  getNewProperties(): Observable<ApiResponse<PropertiesDto[]>> {
    return this.http.get<ApiResponse<PropertiesDto[]>>(
      `${this.apiUrl}/properties/getnew`
    );
  }
  getPropertiesById(id: string): Observable<ApiResponse<propertiesDetailRes[]>> {
    return this.http.get<ApiResponse<propertiesDetailRes[]>>(
      `${this.apiUrl}/properties/${id}`
    );
  }
  createNewProperties(propertiesData: FormData) : Observable<ApiResponse<string>> {
    const url = `${this.apiUrl}/properties/createProperties`;
    return this.http.post<ApiResponse<string>>(url, propertiesData).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  addViewHistory(viewHistory: ViewHistoryReq) : Observable<ApiResponse<string>> {
    const url = `${this.apiUrl}/properties/addViewHistory`;
    return this.http.post<ApiResponse<string>>(url, viewHistory).pipe(
      tap((rs) => {
        return rs.message;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }


  getDataProvinces(): Observable<any> {
    return this.http.get<any>(this.provincesURL);
  }

  getDataCategory(): Observable<any> {
    return this.http.get<any>(this.categoryURL);
  }


  getCommentHistory(IdProperties: any): Observable<ApiResponse<CommentRes[]>> {
    return this.http.get<ApiResponse<CommentRes[]>>(`${this.apiUrl}/properties/getCommentHistory?IdProperties=${IdProperties}`);
}
  getAll(): Observable<ApiResponse<PropertiesDto[]>> {
    return this.http.get<ApiResponse<PropertiesDto[]>>(`${this.apiUrl}/admin-properties/getall`)

  }

}
