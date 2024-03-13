import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserDto} from "../../models/authentication/user.dto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-agent-menu-left',
  templateUrl: './agent-menu-left.component.html',
  styleUrls: ['./agent-menu-left.component.css']
})
export class AgentMenuLeftComponent implements OnDestroy{
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  authenticatedSubscription: Subscription;

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
}
