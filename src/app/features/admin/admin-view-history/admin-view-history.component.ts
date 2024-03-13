import { Component } from '@angular/core';
import { ViewHistoryAdmin } from 'src/app/models/admin/view-history-admin.dto';
import { ViewHistoryAdminService } from 'src/app/services/view-history-admin.service';

@Component({
  selector: 'app-admin-view-history',
  templateUrl: './admin-view-history.component.html',
  styleUrls: ['./admin-view-history.component.css']
})
export class AdminViewHistoryComponent {

  transactions: ViewHistoryAdmin[] = [];
  usernamesearch: string = '';


  constructor(
    private viewHistoryAdminService: ViewHistoryAdminService

  ) { }
  

//Init
ngOnInit(): void {
  this.getAll();
}
//Get All
getAll() {
  this.viewHistoryAdminService.getAll().subscribe((data) => {
    if (data.isSuccessful) {
      this.transactions = data.data ?? [];
    } else {
    }
  });
}

//Search
Search() {
  if (this.usernamesearch != "") {
    // Sử dụng filter để lọc người dùng theo username
    this.transactions = this.transactions.filter(transaction =>　transaction.username &&
      transaction.username.toLowerCase().includes(this.usernamesearch.toLowerCase())
    );
  } else {
    this.ngOnInit();
  }
}

}
