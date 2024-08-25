import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {MessageService} from "primeng/api";
import {UserDto} from "../../dto/UserDto";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  items: UserDto[];
  isLoading: boolean;

  constructor(private userService: UserService, private messageService: MessageService) {
    this.items = [];
    this.isLoading = false;
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getAll().subscribe({
      next: data => {
        this.items = data;
        this.isLoading = false;
      },
      error: err => {
        let detail: string = '';
        if(err.status === 401) {
          detail = 'Authentication needed';
        }
        this.messageService.add({severity: 'error', summary: 'Error during load users', detail});
        this.isLoading = false;
      }
    })
  }
}
