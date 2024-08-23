import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  clientId: string;
  clientSecret: string;

  constructor(private router: Router) {
    this.clientId = localStorage.getItem('clientId') || "";
    this.clientSecret = localStorage.getItem('clientSecret') || "";
  }

  onSave() {
    localStorage.setItem('clientId', this.clientId);
    localStorage.setItem('clientSecret', this.clientSecret);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
