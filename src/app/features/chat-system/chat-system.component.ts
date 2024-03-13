import { Component, ElementRef, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { format, isToday as isTodayFn } from 'date-fns';
import { ChatService } from 'src/app/services/ChatService.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-system',
  templateUrl: './chat-system.component.html',
  styleUrls: ['./chat-system.bootstrap.css','./chat-system.component.css']
})
export class ChatSystemComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  private connection: HubConnection;
  public messages: string[] = [];
  public user: string = "";
  public message: string = "";
  public searchUserName: string = "";
  public senderId!: string;
  public receiverId!: string;
  public reciverUsername!:string;
  public reciverAvatar!:string;
  public senderAvatar!:string;
  public receiverName!: string;
  public receiverRole!: string;
  public messageArray: any[] = []; 
  public ListChatUser: any[] = []; 
  public ListChatHistory: any[] = []; 
  public ListSearchUser: any[] = []; 

  apiUrl = `${environment.baseUrl}`;

  constructor(
    private chatService: ChatService,
  ) {
    // kết nối với singalR
    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/chatHub`)
      .build();
    // lấy thông tin user từ local storage
    const userInfoString = localStorage.getItem('UserInfo');
    if (userInfoString !== null) {
      const userInfo = JSON.parse(userInfoString);
      this.senderId = userInfo.id;
      this.receiverId= userInfo.id;
      this.receiverName = userInfo.fullname;
      this.receiverRole = userInfo.role;
      this.reciverUsername = userInfo.username;
      this.reciverAvatar= userInfo.avatar;
      this.senderAvatar= userInfo.avatar;

      this.user = userInfo.id;
    }
    this.getListChatUser();
    // khởi tạo màn hình sẽ list lịch sử chat của chính user login
    this.getChatHistory();
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  async ngOnInit() {
    this.connection.on('ReceiveMessage', (idsender,idreceiver, message, date) => {
      if ((this.senderId == idsender && this.receiverId == idreceiver) || (this.senderId == idreceiver && this.receiverId == idsender) ){
        let formattedDate: string;
        if (isTodayFn(date)) {
          formattedDate = format(date, "h:mm a, 'Today'");
        } else {
          formattedDate = format(date, "h:mm a, MMM d");
        }
        // thêm message vừa chat. messge này được trả về từ signalR
        this.ListChatHistory.push({ date: formattedDate,idreceiver:idreceiver ,idsender: idsender, message: message, });
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);      
      }
    });

    try {
      await this.connection.start();
    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }
  }

  // send message đến singalR
  async sendMessage() {
    if (!this.senderId || !this.message) return;
    await this.connection.invoke('SendMessage', this.senderId.toString(),this.receiverId.toString(), this.message);
    // clear message sau khi gửi
    this.message = '';
    // this.scrollToBottom();
    // this.ListChatUser.forEach((item) => {
    //   if(item.id != this.receiverId){
    //     this.ListChatUser.push({ id: this.receiverId,username: this.reciverUsername ,fullName: this.receiverName, roleCode:  this.receiverRole, });
    //   }
    // })
  }

  // lấy lịch sử chat 
  getChatHistory() {
    this.chatService.getChatHistory(this.senderId,this.receiverId).subscribe((data) => {
      if (data.isSuccessful && data.data) {
        this.ListChatHistory = data.data ?? [];
      }
      //format date 
      this.ListChatHistory.forEach((mess) => {
        if (isTodayFn(mess.date)) {
          mess.date = format(mess.date, "h:mm a, 'Today'");
        } else {
          mess.date = format(mess.date, "h:mm a, MMM d");
        }
      })
    });
  }

  // lấy ds các user đã từng chat
  getListChatUser() {
    this.chatService.getListChatUser(this.user).subscribe((data) => {
      if (data.isSuccessful && data.data) {
        this.ListChatUser = data.data ?? [];
      }
    });  
  }
  
  onUserClick(userId: any,username:any, fullName: any, roleCode:any,avatar:any): void {
    this.receiverId = userId;
    this.receiverName = fullName;
    this.receiverRole = roleCode;
    this.reciverUsername = username;
    this.reciverAvatar = avatar;

    // lấy toàn bộ lịch sử chat của user được chọn
    this.getChatHistory();
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
    // khi click vào chọn user thì xóa list user đang search đi
    this.ListSearchUser =[]
    //  this.scrollToBottom();
    // this.ListChatUser.forEach((item) => {
    //   if(item.id == this.receiverId ){
    //     this.ListChatUser.push({ id: this.receiverId,username: this.reciverUsername ,fullName: this.receiverName, roleCode:  this.receiverRole, });
    //   }
    // })
  }

  // srcoll chat box xuống message mới nhất
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
  // saerch user cần chat theo user hoặc fullname
  searchUser(event: any): void {
    const value = event?.target?.value?.trim(); // Lấy giá trị và loại bỏ khoảng trắng thừa
    if (value) {
      this.chatService.searchUser(value).subscribe((data) => {
        if (data?.isSuccessful && data?.data) {
          this.ListSearchUser = data.data ?? [];
        }
      });
    }else{
      this.ListSearchUser =[]
    }
  }
  
}

