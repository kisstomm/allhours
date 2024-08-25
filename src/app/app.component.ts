import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'allhours-frontend';
  items: MenuItem[] | undefined;

  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: '/settings',
      },
      {
        label: 'User',
        icon: 'pi pi-user',
        items: [
          {
            label: 'User list',
            icon: 'pi pi-users',
            routerLink: '/user-list',
          },
          {
            label: 'User create',
            icon: 'pi pi-user-plus',
            routerLink: '/user-create',
          }
        ]
      }
    ]
  }

}
