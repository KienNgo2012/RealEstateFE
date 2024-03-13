import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/authentication/user.dto';
import { ApiResponse } from '../models/api-response.dto';
import { Observable } from 'rxjs';
import { Chatres } from '../models/chat/chat.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) { }

  // READ
  getListChatUser(userid:any): Observable<ApiResponse<UserDto[]>> {
    return this.http.get<ApiResponse<UserDto[]>>(`${this.apiUrl}/chatHubsUser/listChatUser?userid=${userid}`)
  }

  getChatHistory(idSender: any, idReciver: any): Observable<ApiResponse<Chatres[]>> {
    return this.http.get<ApiResponse<Chatres[]>>(`${this.apiUrl}/chatHubsUser/chatHistory?idSender=${idSender}&idReciver=${idReciver}`);
  }
  
  searchUser(name:any): Observable<ApiResponse<UserDto[]>> {
    return this.http.get<ApiResponse<UserDto[]>>(`${this.apiUrl}/chatHubsUser/searchUser?name=${name}`);
  }
}
