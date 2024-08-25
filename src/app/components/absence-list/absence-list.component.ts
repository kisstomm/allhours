import { Component } from '@angular/core';
import {UserDto} from "../../dto/UserDto";
import {AbsenceDto} from "../../dto/AbsenceDto";
import {AbsenceService} from "../../service/absence.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.scss']
})
export class AbsenceListComponent {
  items: AbsenceDto[];
  isLoading: boolean;

  constructor(private absenceService: AbsenceService, private messageService: MessageService) {
    this.items = [];
    this.isLoading = false;

    this.absenceService.getAll().subscribe({
      next: data => {
        this.items = data;
        this.isLoading = false;
      },
      error: err => {
        let detail: string = '';
        if(err.status === 401) {
          detail = 'Authentication needed';
        }
        this.messageService.add({severity: 'error', summary: 'Error during load absences', detail});
        this.isLoading = false;
      }
    })
  }
}
