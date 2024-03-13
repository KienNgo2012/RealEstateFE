import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from './pipes/reverse.pipe';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { EnumDescriptionPipe } from './pipes/enum-description.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NavbarComponent } from './features/navbar/navbar.component';
import { LoginComponent } from './features/login/login.component';
import { AuthInterceptor } from './interceptor/authen.interceptor';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';
import { DialogModule } from 'primeng/dialog';
import { ProductInfoComponent } from './features/product-info/product-info.component';
import { ProductInfoDetailComponent } from './features/product-info-detail/product-info-detail.component';
import { FooterComponent } from './features/footer/footer.component';
import { ChatSystemComponent } from './features/chat-system/chat-system.component';
import { RegisterComponent } from './features/register/register.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import { MenuModule } from 'primeng/menu';
import { AgentMenuLeftComponent } from './features/agent-menu-left/agent-menu-left.component';
import { AgentPropertiesComponent } from './features/agent-properties/agent-properties.component';
import { PanelModule } from 'primeng/panel';
import {ImageModule} from 'primeng/image';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { PropertiesListingComponent } from './features/properties-listing/properties-listing.component';
import { AdminMenuLeftComponent } from './features/admin/admin-menu-left/admin-menu-left.component';
import { UserRolesComponent } from './features/admin/user-roles/user-roles.component';
import { EditUserRolesComponent } from './features/admin/edit-user-roles/edit-user-roles.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgentUpdatePropertiesComponent } from './features/agent-update-properties/agent-update-properties.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { UserMenuLeftComponent } from './features/user-menu-left/user-menu-left.component';
import { UserTransactionComponent } from './features/user-transaction/user-transaction.component';
import { AgentTransactionsComponent } from './features/agent-transactions/agent-transactions.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AdminTransactionComponent } from './features/admin/admin-transaction/admin-transaction.component';
import { AdminViewHistoryComponent } from './features/admin/admin-view-history/admin-view-history.component';
import { AdminPropertiesComponent } from './features/admin/admin-properties/admin-properties.component';
import { NgxCaptchaModule } from 'ngx-captcha';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ReversePipe,
    UppercasePipe,
    EnumDescriptionPipe,
    NavbarComponent,
    LoginComponent,
    AccessDeniedComponent,
    ProductInfoComponent,
    ProductInfoDetailComponent,
    FooterComponent,
    ChatSystemComponent,
    RegisterComponent,
    CreateProductComponent,
    AgentMenuLeftComponent,
    AgentPropertiesComponent,
    PropertiesListingComponent,
    AdminMenuLeftComponent,
    UserRolesComponent,
    EditUserRolesComponent,
    AgentUpdatePropertiesComponent,
    AgentUpdatePropertiesComponent,
    UserProfileComponent,
    UserMenuLeftComponent,
    UserTransactionComponent,
    AgentTransactionsComponent,
    AdminTransactionComponent,
    AdminViewHistoryComponent,
    AdminPropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    CheckboxModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    MenuModule,
    PanelModule,
    ImageModule,
    DataViewModule,
    TagModule,
    InputTextModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatDialogModule,
    MessagesModule,
    MultiSelectModule,
    NgxCaptchaModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
