import { Component } from '@angular/core';
import {UserDto} from "../../dto/UserDto";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  user: UserDto;
  isShowError: Map<string, boolean>;

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) {
    this.user = new UserDto();
    this.isShowError = new Map<string, boolean>;
  }

  onFirstNameChange() {
    const isError: boolean = this.user.FirstName === "" || this.user.FirstName === null || this.user.FirstName === undefined;
    this.isShowError.set('firstName', isError);
  }

  onLastNameChange() {
    const isError: boolean = this.user.LastName === "" || this.user.LastName === null|| this.user.LastName === undefined;
    this.isShowError.set('lastName', isError);
  }

  onEmailChange() {
    const isError: boolean = this.user.Email === "" || this.user.Email === null|| this.user.Email === undefined;
    this.isShowError.set('email', isError);
  }

  onSave() {
    this.validateFields();
    if (!this.hasFieldsErrors()) {
      try {
        this.userService.create(this.user).subscribe({
          next: response => {
            this.messageService.add({severity: 'success', summary: 'User created', detail: ''});
          },
          error: err => {
            let detail: string = '';
            if(err.status === 401) {
              detail = 'Authentication needed';
            } else if(err.status === 400) {
              detail = err.error.error;
            }

            this.messageService.add({severity: 'error', summary: 'Error during user creation', detail});
          }
        })
      } catch (e) {
        this.messageService.add({severity: 'error', summary: 'Error during user creation', detail: ''});
      }
    }
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
    this.onFirstNameChange();
    this.onLastNameChange();
    this.onEmailChange();
  }
}
