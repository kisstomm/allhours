import {Component} from '@angular/core';
import {AbsenceService} from "../../service/absence.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import * as moment from "moment/moment";
import {Validator} from "../../helper/validator";
import {AbsenceDefinitionDto} from "../../dto/AbsenceDefinitionDto";
import {AbsenceUpdateDto} from "../../dto/AbsenceUpdateDto";
import {AbsenceDefinitionService} from "../../service/absence-definition.service";
import {UserDto} from "../../dto/UserDto";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-absence-edit',
  templateUrl: './absence-edit.component.html',
  styleUrls: ['./absence-edit.component.scss']
})
export class AbsenceEditComponent {
  absenceId: string;
  absence: AbsenceUpdateDto;
  user: UserDto;

  absenceDefinitionList: AbsenceDefinitionDto[];
  selectedAbsenceDefinition: AbsenceDefinitionDto;
  partialTimeFrom: Date;
  partialTimeTo: Date;

  constructor(private absenceService: AbsenceService, private absenceDefinitionService: AbsenceDefinitionService, private userService: UserService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.absenceId = this.route.snapshot.paramMap.get('id') || "";
    this.absence = new AbsenceUpdateDto();
    this.user = new UserDto();

    this.absenceDefinitionList = [];
    this.selectedAbsenceDefinition = new AbsenceDefinitionDto();
    this.partialTimeFrom = new Date();
    this.partialTimeTo = new Date();

    if (this.absenceId === "") {
      this.router.navigate(['/']);
    }

    this.loadAbsence();
  }

  loadAbsence() {
    this.absenceService.getById(this.absenceId).subscribe({
      next: response => {

        this.absence = response;
        this.partialTimeFrom = moment(this.absence.PartialTimeFrom?.substring(0, 19)).toDate();
        this.partialTimeTo = moment(this.absence.PartialTimeTo?.substring(0, 19)).toDate();

        this.loadCurrentAbsenceDefinition();
        this.loadUser();
      },
      error: err => {
        let detail: string = '';
        if (err.status === 401) {
          detail = 'Authentication needed';
        } else if (err.status === 400) {
          detail = err.error.error;
        }

        this.messageService.add({severity: 'error', summary: 'Error during load absence', detail});
      }
    })
  }

  loadCurrentAbsenceDefinition() {
    this.absenceDefinitionService.getAll().subscribe({
      next: response => {
        this.absenceDefinitionList = response;
      },
      error: err => {
        let detail: string = '';
        if(err.status === 401) {
          detail = 'Authentication needed';
        } else if(err.status === 400) {
          detail = err.error.error;
        }

        this.messageService.add({severity: 'error', summary: 'Error during load absence definitions', detail});
      }
    })

    this.absenceDefinitionService.getById(this.absence.AbsenceDefinitionId || "").subscribe({
      next: response => {
        this.selectedAbsenceDefinition = response;
      },
      error: err => {
        let detail: string = '';
        if (err.status === 401) {
          detail = 'Authentication needed';
        } else if (err.status === 400) {
          detail = err.error.error;
        }

        this.messageService.add({severity: 'error', summary: 'Error during load absence', detail});
      }
    })
  }

  loadUser() {
    this.userService.getById(this.absence.UserId || "").subscribe({
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
    });
  }

  onSave() {
    try {
      this.absence.Timestamp = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
      this.absence.AbsenceDefinitionId = this.selectedAbsenceDefinition.Id;
      this.absenceService.update(this.absence).subscribe({
        next: response => {
          this.messageService.add({severity: 'success', summary: 'Absence created', detail: ''});
          this.loadAbsence();
        },
        error: err => {
          let detail: string = '';
          if (err.status === 401) {
            detail = 'Authentication needed';
          } else if (err.status === 400) {
            detail = err.error.error;
          }

          this.messageService.add({severity: 'error', summary: 'Error during absence creation', detail});
        }
      })
    } catch (e) {
      this.messageService.add({severity: 'error', summary: 'Error during absence creation', detail: ''});
    }
  }

  onPartialTimeFromChange() {
    const isError: boolean = Validator.isEmpty(this.partialTimeFrom.toString());

    if (isError) {
      this.absence.PartialTimeFrom = "";
    } else {
      this.absence.PartialTimeFrom = moment(this.partialTimeFrom).format('YYYY-MM-DDTHH:mm:ss');
    }
  }

  onPartialTimeToChange() {
    const isError: boolean = Validator.isEmpty(this.partialTimeTo.toString());

    if (isError) {
      this.absence.PartialTimeTo = "";
    } else {
      this.absence.PartialTimeTo = moment(this.partialTimeTo).format('YYYY-MM-DDTHH:mm:ss');
    }
  }
}
