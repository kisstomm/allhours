import {Component} from '@angular/core';
import {AbsenceService} from "../../service/absence.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import * as moment from "moment/moment";
import {Validator} from "../../helper/validator";
import {AbsenceDefinitionDto} from "../../dto/AbsenceDefinitionDto";
import {AbsenceUpdateDto} from "../../dto/AbsenceUpdateDto";
import {AbsenceDefinitionService} from "../../service/absence-definition.service";

@Component({
  selector: 'app-absence-edit',
  templateUrl: './absence-edit.component.html',
  styleUrls: ['./absence-edit.component.scss']
})
export class AbsenceEditComponent {
  absenceId: string;
  absence: AbsenceUpdateDto;

  absenceDefinitionList: AbsenceDefinitionDto[];
  selectedAbsenceDefinition: AbsenceDefinitionDto;
  partialTimeFrom: any;
  partialTimeTo: Date;

  constructor(private absenceService: AbsenceService, private absenceDefinitionService: AbsenceDefinitionService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.absenceId = this.route.snapshot.paramMap.get('id') || "";
    this.absence = new AbsenceUpdateDto();

    this.absenceDefinitionList = [];
    this.selectedAbsenceDefinition = new AbsenceDefinitionDto();
    this.partialTimeFrom = 0;
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
        this.partialTimeFrom = moment(this.absence.PartialTimeFrom).toDate();
        this.partialTimeTo = moment(this.absence.PartialTimeTo).toDate();

        this.loadCurrentAbsenceDefinition();
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

  onSave() {
    try {
      // this.createAbsence.UserId = this.userId;
      this.absence.Timestamp = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
      this.absence.AbsenceDefinitionId = this.selectedAbsenceDefinition.Id;
      this.absenceService.update(this.absence).subscribe({
        next: response => {
          this.messageService.add({severity: 'success', summary: 'Absence created', detail: ''});
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
