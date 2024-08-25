import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {TokenService} from "../../service/token.service";
import {Validator} from "../../helper/validator";

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
    this.clientId = this.tokenService.loadClientId();
    this.clientSecret = this.tokenService.loadClientSecret();
    this.isShowError = new Map<string, boolean>;
  }

  onClientIdChange() {
    const isError: boolean = Validator.isEmpty(this.clientId)
    this.isShowError.set('clientId', isError);
  }

  onClientSecretChange() {
    const isError: boolean = Validator.isEmpty(this.clientSecret);
    this.isShowError.set('clientSecret', isError);
  }

  onAuth() {
    this.validateFields();
    if (!this.hasFieldsErrors()) {
      try {
        this.tokenService.saveClientId(this.clientId);
        this.tokenService.saveClientSecret(this.clientSecret);

        this.tokenService.getBearerToken().subscribe({
          next: response => {
            this.tokenService.saveToken(response);
            this.messageService.add({severity: 'success', summary: 'Authenticated successfully', detail: ''});
          },
          error: err => {
            this.tokenService.removeToken();
            this.messageService.add({severity: 'error', summary: 'Error during authentication', detail: ''});
          }
        })
      } catch (e) {
        this.tokenService.removeToken();
        this.messageService.add({severity: 'error', summary: 'Error during authentication', detail: ''});
      }
    }
  }

  onCancel() {
    this.messageService.add({ severity: 'info', summary: 'Settings restored', detail: '' });
    this.router.navigate(['/']);
  }

  hasFieldsErrors(): boolean {
    for (let [key, isError] of this.isShowError) {
      if (isError) {
        return true;
      }
    }

    return false;
  }

  private validateFields() {
    this.onClientIdChange();
    this.onClientSecretChange();
  }

}
