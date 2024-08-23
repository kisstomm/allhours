import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  clientId: string;
  clientSecret: string;

  constructor() {
    this.clientId = localStorage.getItem('clientId') || "";
    this.clientSecret = localStorage.getItem('clientSecret') || "";
  }

  onSave() {
    console.log(this.clientId);
    console.log(this.clientSecret);

    localStorage.setItem('clientId', this.clientId);
    localStorage.setItem('clientSecret', this.clientSecret);
  }
}
