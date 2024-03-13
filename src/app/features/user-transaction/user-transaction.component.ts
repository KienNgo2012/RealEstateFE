import {Component, OnInit, ViewChild} from '@angular/core';
import {AgentService} from "../../services/agent.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {UserDto} from "../../models/authentication/user.dto";
import {AgentTransactionDto, UserInfo} from "../../models/agent/agent-transaction.dto";
import {Table} from "primeng/table";
import { UserProfileServices } from 'src/app/services/user-profile.services';

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.css']
})
export class UserTransactionComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  authenticatedSubscription: Subscription;
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  transactions: AgentTransactionDto[] = [];
  dataAll: AgentTransactionDto[] = [];
  loading: boolean = true;
  globalFilter: string = '';
  userinfos: UserInfo[] = [];
  cachedObject = {};
  statuses?: any[];
  constructor(
    private userProfileService: UserProfileServices,
    private authenService: AuthenticationService,
    private router: Router,
    private confirmationService: ConfirmationService,
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
      { label: 'success', value: 'success' }
    ];
  }
  loadPropertiesNew() {
    this.userProfileService.getTransactrionsByIdUser(this.user?.id).subscribe((data) => {
      if (data.isSuccessful) {
        this.dataAll = data.data ?? [];
        this.transactions = this.dataAll;
        this.loading = false;
        this.transactions.forEach((user)=>{
          this.userinfos.push({id: user.idBuyer, name: user.username, image: user.avatar})
        });
        // @ts-ignore
        this.userinfos.map((item) => (this.cachedObject[item.id] = item));
        this.userinfos = Object.values(this.cachedObject);
      }
    });
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }

  // @ts-ignore
  getSeverity(status: any) {
    switch (status) {
      case 'waiting confirm':
        return 'danger';

      // case 'qualified':
      //   return 'success';

      // case 'waiting support':
      //   return 'info';

      case 'waiting support':
        return 'warning';
      //
      // case 'renewal':
      //   return null;
    }
  }
}
