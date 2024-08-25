import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../../dto/UserDto";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-absence-create',
  templateUrl: './user-absence-create.component.html',
  styleUrls: ['./user-absence-create.component.scss']
})
export class UserAbsenceCreateComponent {
  userId: string;
  user: UserDto;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.userId = this.route.snapshot.paramMap.get('id') || "";
    this.user = new UserDto();

    if(this.userId === "") {
      this.router.navigate(['/']);
    }

    this.userService.getById(this.userId).subscribe({
      next: response => {
        this.user = response;
      },
      error: err => {
        let detail: string = '';
        if(err.status === 401) {
          detail = 'Authentication needed';
        } else if(err.status === 400) {
          detail = err.error.error;
        }

        this.messageService.add({severity: 'error', summary: 'Error during load user', detail});
      }
    })
  }
}
