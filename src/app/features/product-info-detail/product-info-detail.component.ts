import { Component, OnDestroy, ValueSansProvider } from '@angular/core';
import { PropertiesDto } from 'src/app/models/properties/properties.dto';
import { PropertiesService } from 'src/app/services/properties.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionDto } from 'src/app/models/transaction/transaction.dto';
import { TransactionReq } from 'src/app/models/transaction/transaction-req.dto';
import { TransactionService } from 'src/app/services/transaction.service';
import { MessageService } from 'primeng/api';
import { propertiesDetailRes } from 'src/app/models/properties/propertiesDetailRes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { ViewHistoryReq } from 'src/app/models/properties/viewhistory.dto';
import { format, isToday as isTodayFn } from 'date-fns';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-info-detail',
  templateUrl: './product-info-detail.component.html',
  styleUrls: ['./product-info-detail.component.css']
})

export class ProductInfoDetailComponent implements OnDestroy {
  propertiesdetail: propertiesDetailRes[] = [];
  id!: string;
  transactiondetail: TransactionDto[] = [];
  transactionreq: TransactionReq = {
    IdProperties: 0, IdBuyer: 0, IdSeller: 0, Price: 0, Date: new Date(),Status: ''
  };
  viewHistoryReq: ViewHistoryReq = {
    idUser: 0, idProperties: 0, date: new Date()
  };
  public userid: string = "";
  public username: string = "";

  public useravatar: string = "";

  authenticatedSubscription: Subscription;
  isUserAuthenticated: boolean = false;
  apiUrl = `${environment.baseUrl}`;
  private connection: HubConnection;
  public listComment: any[] = []; 
  comment="";
  constructor(
    private propertiesService: PropertiesService,
    private transactionService: TransactionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authenService: AuthenticationService,

  ) {
    // kết nối với singalR
    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/commentHub`)
      .build();
      
     // lấy thông tin user từ local storage
     const userInfoString = localStorage.getItem('UserInfo');
     if (userInfoString !== null) {
       const userInfo = JSON.parse(userInfoString);
       this.userid = userInfo?.id;
       this.username = userInfo?.username;
       this.useravatar = userInfo?.avatar;

     }
     this.authenticatedSubscription = this.authenService.authChanged.subscribe(
      (rs) => {
        this.isUserAuthenticated = rs;
      }
    );

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.loadPropertiesDetail();
      this.loadTransactionDetail();
      this.loadCommentHistory();
      // this.sortCommentsByDateDescending();
      if(this.userid!=null){
        this.addViewHistory()
      };
    });
  }

  ngOnDestroy(): void {
    this.authenticatedSubscription.unsubscribe();
  }

  async ngOnInit() {
    //return comment from signalR
    this.connection.on('ReceiveComment', (IdProperties,IdUser, comment, createDate) => {
      if( this.id==IdProperties){
        this.listComment.unshift({ idUser:IdUser,username: this.username,idProperties: IdProperties,createDate: createDate, avatar:this.useravatar,comment: comment });
      }
    });

    try {
      await this.connection.start();
    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }
  }

   // send message đến singalR
   async sendComment() {
    await this.connection.invoke('SendComment', this.id.toString(),this.userid.toString(), this.comment);
    this.comment="";
  }

  loadPropertiesDetail() {
    this.propertiesService.getPropertiesById(this.id).subscribe((data) => {
      if (data.isSuccessful && data.data) {
        this.propertiesdetail = data.data ?? [];
      } 
    });
  }

  loadCommentHistory() {
    this.propertiesService.getCommentHistory(this.id).subscribe((data) => {
      if (data.isSuccessful && data.data) {
        this.listComment = data.data ?? [];
        // console.log( this.listComment)
      } 
    });
    
  }
  sortCommentsByDateDescending() {
    this.listComment.sort((a, b) => {
      const datePipe = new DatePipe('en-US');
      const aDate = datePipe.transform(a.createDate, 'yyyy-MM-ddTHH:mm:ss');
      const bDate = datePipe.transform(b.createDate, 'yyyy-MM-ddTHH:mm:ss');
      
      return bDate!.localeCompare(aDate!);
    });
  }

  loadTransactionDetail() {
    this.transactionService.getTransactionByProperties(this.id).subscribe((data) => {
      if (data.isSuccessful && data.data) {
        this.transactiondetail = data.data ?? [];
      } 
    });
  }

addViewHistory(){
  this.viewHistoryReq.idUser =  parseInt(this.userid, 10);
  this.viewHistoryReq.idProperties =  parseInt(this.id, 10);

  this.propertiesService.addViewHistory(this.viewHistoryReq).subscribe((data) => {
  });
}
  registerProperties(IdProperties:any,IdSeller:any,Price:any,Status:any, StatusProperties:any){
    this.transactionreq.IdProperties= IdProperties;
    if(this.userid!=""){
    this.transactionreq.IdBuyer= parseInt(this.userid, 10);//user đang login
  }
    this.transactionreq.IdSeller= IdSeller;
    this.transactionreq.Price= Price;
    this.transactionreq.Status= Status;
    if(StatusProperties=='Đã bán' && this.transactionreq.Status== 'waiting confirm'){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Properties have been sold',
      });
    }else{
      this.transactionService.createTransaction(this.transactionreq).subscribe((data) => {
        if (data.isSuccessful) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: data.data,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.message,
          });
        }
      });
    }
  }
}
