import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  clientId: string;
  clientSecret: string;

  constructor(private router: Router, private messageService: MessageService) {
    this.clientId = localStorage.getItem('clientId') || "";
    this.clientSecret = localStorage.getItem('clientSecret') || "";
  }

  onSave() {
    try {
      this.saveDataToLocalStorage();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Settings saved' });
    } catch (e) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error during save settings' });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private saveDataToLocalStorage() {
    localStorage.setItem('clientId', this.clientId);
    localStorage.setItem('clientSecret', this.clientSecret);
  }
}
