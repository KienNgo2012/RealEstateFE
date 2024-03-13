import { Component } from '@angular/core';
import { UserDto } from 'src/app/models/authentication/user.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-menu-left',
  templateUrl: './admin-menu-left.component.html',
  styleUrls: ['./admin-menu-left.component.css']
})
export class AdminMenuLeftComponent {
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  authenticatedSubscription: Subscription;
  showSelector: boolean = true;
  constructor(
    private authenService: AuthenticationService,
    private router: Router
  ) {
    this.authenticatedSubscription = this.authenService.authChanged.subscribe(
      (rs) => {
        this.isUserAuthenticated = rs;
        this.user = this.authenService.getUserInfo();
      }
    );
  }

  ngOnDestroy(): void {
    this.authenticatedSubscription.unsubscribe();
  }

  logout() {
    this.authenService.logout();
    this.router.navigate(['/home']);
  }

  onMenuItemClick(route: string) {
    this.router.navigate([route]);
  }
}
