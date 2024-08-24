import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  clientId: string;
  clientSecret: string;
  isShowError: Map<string, boolean>;

  constructor(private tokenService: TokenService, private router: Router, private messageService: MessageService) {
    this.clientId = localStorage.getItem('clientId') || "";
    this.clientSecret = localStorage.getItem('clientSecret') || "";
    this.isShowError = new Map<string, boolean>;
  }

  onClientIdChange() {
    const isError: boolean = this.clientId === "" || this.clientId === null;
    this.isShowError.set('clientId', isError);

  }

  onClientSecretChange() {
    const isError: boolean = this.clientSecret === "" || this.clientSecret === null;
    this.isShowError.set('clientSecret', isError);
  }

  onSave() {
    this.validateFields();
    if (this.isSaveButtonEnabled()) {
      try {
        this.saveDataToLocalStorage();
        this.messageService.add({severity: 'success', summary: 'Settings saved', detail: ''});
        this.router.navigate(['/']);
      } catch (e) {
        this.messageService.add({severity: 'error', summary: 'Error during save settings', detail: ''});
      }
    }
  }

  onCancel() {
    this.messageService.add({ severity: 'info', summary: 'Settings restored', detail: '' });
    this.router.navigate(['/']);
  }

  isSaveButtonEnabled(): boolean {
    for (let [key, isError] of this.isShowError) {
      if (isError) {
        return false;
      }
    }

    return true;
  }

  private validateFields() {
    this.onClientIdChange();
    this.onClientSecretChange();
  }

  private saveDataToLocalStorage() {
    localStorage.setItem('clientId', this.clientId);
    localStorage.setItem('clientSecret', this.clientSecret);
  }

  onAuth() {
    this.tokenService.getBearerToken().subscribe({
      next: response => {
        this.tokenService.saveToken(response);
        this.messageService.add({severity: 'success', summary: 'Authenticated successfully', detail: ''});
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'Error during authenticate', detail: ''});
      }
    })
  }
}
