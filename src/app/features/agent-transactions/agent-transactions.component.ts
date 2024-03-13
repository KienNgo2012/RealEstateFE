import {Component, OnInit, ViewChild} from '@angular/core';
import {AgentService} from "../../services/agent.service";
import {AuthenticationService} from "../../services/authentication.service";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {UserDto} from "../../models/authentication/user.dto";
import {AgentTransactionDto} from "../../models/agent/agent-transaction.dto";
import {Table} from "primeng/table";

@Component({
  selector: 'app-agent-transactions',
  templateUrl: './agent-transactions.component.html',
  styleUrls: ['./agent-transactions.component.css']
})
export class AgentTransactionsComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  authenticatedSubscription: Subscription;
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  transactions: AgentTransactionDto[] = [];
  dataAll: AgentTransactionDto[] = [];
  loading: boolean = true;
  globalFilter: string = '';
  statuses?: any[];
  constructor(
    private agentService: AgentService,
    private authenService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.authenticatedSubscription = this.authenService.authChanged.subscribe(
      (rs) => {
        this.isUserAuthenticated = rs;
        this.user = this.authenService.getUserInfo();
      }
    );
  }
  ngOnInit() {
    this.loadPropertiesNew();
    this.statuses = [
      { label: 'waiting confirm', value: 'waiting confirm' },
      { label: 'waiting support', value: 'waiting support' },
      { label: 'success', value: 'success' },
    ];
  }
  loadPropertiesNew() {
    this.agentService.getTransactrionsByIdUser(this.user?.id).subscribe((data) => {
      if (data.isSuccessful) {
        this.dataAll = data.data ?? [];
        this.transactions = this.dataAll;
        this.loading = false;
      }
    });
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onConfirm(transaction: any){
    debugger;
    if(transaction.status == 'waiting confirm'){
      this.agentService.updateTransactinStatus(transaction.id).subscribe(
        (rs: any) => {
          if (rs.isSuccessful) {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Confirm success', });
            this.loadPropertiesNew();
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: rs.message, });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, });
        }
      );
    }else if(transaction.status == 'waiting support'){
      this.agentService.deleteTransactinStatus(transaction.id).subscribe(
        (rs: any) => {
          if (rs.isSuccessful) {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Confirm success', });
            this.loadPropertiesNew();
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: rs.message, });
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, });
        }
      );
    }

  }

  // @ts-ignore
  getSeverity(status: any) {
    switch (status) {
      case 'waiting confirm':
        return 'danger';

      case 'success':
        return 'success';

      case 'waiting support':
        return 'warning';
    }
  }
}
