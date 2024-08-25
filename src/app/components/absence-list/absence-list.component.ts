import {Component} from '@angular/core';
import {AbsenceDto} from "../../dto/AbsenceDto";
import {AbsenceService} from "../../service/absence.service";
import {MessageService} from "primeng/api";
import {Validator} from "../../helper/validator";
import * as moment from "moment/moment";

@Component({
  selector: 'app-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.scss']
})
export class AbsenceListComponent {
  items: AbsenceDto[];
  isLoading: boolean;
  absenceFrom: string;
  absenceTo: string;
  filterAbsenceFrom: string;
  filterAbsenceTo: string;

  constructor(private absenceService: AbsenceService, private messageService: MessageService) {
    this.items = [];
    this.isLoading = false;
    this.absenceFrom = "";
    this.absenceTo = "";
    this.filterAbsenceFrom = "";
    this.filterAbsenceTo = "";

    this.getAbsences();
  }

  getAbsences() {
    this.absenceService.getAllFilterAbsenceDate(this.filterAbsenceFrom, this.filterAbsenceTo).subscribe({
      next: data => {
        this.items = data;
        this.isLoading = false;
      },
      error: err => {
        let detail: string = '';
        if (err.status === 401) {
          detail = 'Authentication needed';
        }
        this.messageService.add({severity: 'error', summary: 'Error during load absences', detail});
        this.isLoading = false;
      }
    })
  }

  onAbsenceFromChange() {
    const isError: boolean = Validator.isEmpty(this.absenceFrom);

    if (isError) {
      this.filterAbsenceFrom = "";
    } else {
      this.filterAbsenceFrom = moment(this.absenceFrom).format('YYYY-MM-DDTHH:mm:ss');
    }

    this.getAbsences();
  }

  onAbsenceToChange() {
    const isError: boolean = Validator.isEmpty(this.absenceTo);

    if (isError) {
      this.filterAbsenceTo = "";
    } else {
      this.filterAbsenceTo = moment(this.absenceTo).format('YYYY-MM-DDTHH:mm:ss');
    }

    this.getAbsences();
  }

}
