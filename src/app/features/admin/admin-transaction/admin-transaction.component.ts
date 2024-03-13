import { Component } from '@angular/core';
import { TransactionAdmin } from 'src/app/models/transaction/transaction-admin.dto';
import { TransactionAdminService } from 'src/app/services/transaction-admin.service';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css']
})
export class AdminTransactionComponent {

  transactions: TransactionAdmin[] = [];
  showRole: boolean = false;
  titlesearch: string = '';


  constructor(
    private transactionAdminService: TransactionAdminService

  ) { }
  

//Init
ngOnInit(): void {
  this.getAll();
}
//Get All
getAll() {
  this.transactionAdminService.getAll().subscribe((data) => {
    if (data.isSuccessful) {
      this.transactions = data.data ?? [];
    } else {
    }
  });
}

//Search
Search() {
  if (this.titlesearch != "") {
    // Sử dụng filter để lọc người dùng theo username
    this.transactions = this.transactions.filter(transaction =>　transaction.title &&
      transaction.title.toLowerCase().includes(this.titlesearch.toLowerCase())
    );
  } else {
    this.ngOnInit();
  }
}
getSeverity(status: any) {
  switch (status) {
    case 'waiting confirm':
      return 'danger';
    case 'waiting support':
      return 'warning';
    default:
        return undefined;

  }
}

}
