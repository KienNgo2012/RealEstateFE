import { NgModule } from '@angular/core';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { ChatSystemComponent } from './features/chat-system/chat-system.component';
import { RegisterComponent } from './features/register/register.component';
import { ProductInfoDetailComponent } from './features/product-info-detail/product-info-detail.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import {AgentMenuLeftComponent} from "./features/agent-menu-left/agent-menu-left.component";
import {AgentPropertiesComponent} from "./features/agent-properties/agent-properties.component";
import { PropertiesListingComponent } from './features/properties-listing/properties-listing.component';
import { AdminMenuLeftComponent } from './features/admin/admin-menu-left/admin-menu-left.component';
import { UserRolesComponent } from './features/admin/user-roles/user-roles.component';
import {AgentUpdatePropertiesComponent} from "./features/agent-update-properties/agent-update-properties.component";
import { UserMenuLeftComponent } from './features/user-menu-left/user-menu-left.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { UserTransactionComponent } from './features/user-transaction/user-transaction.component';
import {AgentTransactionsComponent} from "./features/agent-transactions/agent-transactions.component";
import { AdminTransactionComponent } from './features/admin/admin-transaction/admin-transaction.component';
import { AdminViewHistoryComponent } from './features/admin/admin-view-history/admin-view-history.component';
import { AdminPropertiesComponent } from './features/admin/admin-properties/admin-properties.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  //Admin
  {
    path: 'admin',
    component: AdminMenuLeftComponent,
    children: [
      {
        path: 'user-roles',
        component: UserRolesComponent,
      },
      {
        path: 'transaction',
        component: AdminTransactionComponent,
      },
      {
        path: 'viewhistory',
        component: AdminViewHistoryComponent,
      },
      {
        path: 'admin-properties',
        component: AdminPropertiesComponent,
      }
    ]
  },
  {
    path: 'messages',
    component: ChatSystemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'properties/:id',
    component: ProductInfoDetailComponent,
  },
  {
    path: 'properties-listing',
    component: PropertiesListingComponent,
  },
  {
    path: 'create-properties',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'menu',
    component: AgentMenuLeftComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'agent-properties',
        component: AgentPropertiesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'app-agent-update-properties',
        component: AgentUpdatePropertiesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'agent-transactions',
        component: AgentTransactionsComponent,
        canActivate: [AuthGuard],
      }
    ]
  },

  {
    path: 'user',
    component: UserMenuLeftComponent,
    children: [
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-transaction',
        component: UserTransactionComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
