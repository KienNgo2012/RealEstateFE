import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/models/authentication/user.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  isUserAuthenticated: boolean = false;
  user: UserDto | null = null;
  menu: MenuItem[] = [];
  authenticatedSubscription: Subscription;

  constructor(
    private authenService: AuthenticationService,
    private router: Router
  ) {
    this.authenticatedSubscription = this.authenService.authChanged.subscribe(
      (rs) => {
        this.isUserAuthenticated = rs;
        this.user = this.authenService.getUserInfo();
        this.setMenu();
      }
    );
  }

  ngOnDestroy(): void {
    this.authenticatedSubscription.unsubscribe();
  }

  setMenu() {
    this.menu = [{ type: 'item', link: '/home', children: [], label: 'Home' }];

    if (this.isUserAuthenticated) {
      this.menu = this.menu.concat([
        {
          type: 'item',
          link: '/books',
          children: [],
          label: 'Books',
        },
      ]);
    }
  }

  logout() {
    this.authenService.logout();
    this.router.navigate(['/home']);
  }
  toggleUserInfo(){
    
  }
}

class MenuItem {
  type!: 'group' | 'item';
  link!: string;
  children!: MenuItem[];
  label!: string;
}
