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

  constructor(private userService: UserService, private messageService: MessageService) {
    this.items = [];
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe({
      next: data => {
        this.items = data;
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'Error during load users', detail: ''});
      }
    })
  }
}
