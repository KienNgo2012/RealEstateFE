import {Component} from '@angular/core';
import {PropertiesDto} from "../../models/properties/properties.dto";
import {AgentService} from "../../services/agent.service";
import {UserDto} from "../../models/authentication/user.dto";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-properties',
  templateUrl: './agent-properties.component.html',
  styleUrls: ['./agent-properties.component.css']
})
export class AgentPropertiesComponent{
  properties: PropertiesDto[] | undefined;
  dataAll: PropertiesDto[] | undefined;
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  authenticatedSubscription: Subscription;
  sortOptions: SelectItem[] | undefined;
  selectedSort: { field: string, order: number } = { field: 'name', order: 1 };
  textSearch: string = '';

  constructor(
    private agentService: AgentService,
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
  ngOnInit(): void {
    this.loadPropertiesNew();
    this.sortOptions = [
      { label: 'Price High to Low', value: { field: 'price', order: -1 }  },
      { label: 'Price Low to High', value: { field: 'price', order: 1 }  }
    ];
  }
  loadPropertiesNew() {
    this.agentService.getPropertiesByIdUser(this.user?.id).subscribe((data) => {
      if (data.isSuccessful) {
        this.dataAll = data.data;
        this.properties = this.dataAll;
      }
    });
  }

  getSeverity (property: { status: any; }) {
    switch (property.status) {
      case 'Đã bán':
        return 'success';

      case 'Đang bán':
        return 'warning';

      case 'Còn hàng':
        return 'danger';

      default:
        return undefined;
    }
  };

  onSortChange({event}: { event: any }) {
    this.selectedSort = event.value;
  }

  onSearch() {

    if(this.dataAll != undefined) {
      if (this.textSearch.trim() === '') {
        this.properties = this.dataAll;
      } else {
        this.properties = this.dataAll.filter(item =>
          (item.title.toLowerCase()).includes(this.textSearch.toLowerCase()) ||
          (item.category.toLowerCase()).includes(this.textSearch.toLowerCase())
        );
      }
    }
  }

  onRowClick(product: any) {
    this.agentService.setSelectedRowData(product);
  }

  onUpdateClick(product: any) {
    this.agentService.setSelectedRowData(product);
    this.router.navigate(['menu/app-agent-update-properties']);
  }

  onDeleteClick(product: any) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.agentService.deletePropertiesByIdProperties(product.idProperties).subscribe(
          (rs: any) => {
            if (rs.isSuccessful) {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', });
              this.loadPropertiesNew();
            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: rs.message, });
            }
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, });
          }
        )
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
