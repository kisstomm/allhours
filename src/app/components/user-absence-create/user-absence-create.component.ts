import {Component} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../../dto/UserDto";
import {MessageService} from "primeng/api";
import {AbsenceDefinitionService} from "../../service/absence-definition.service";
import {AbsenceDefinitionDto} from "../../dto/AbsenceDefinitionDto";
import {AbsenceCreateDto} from "../../dto/AbsenceCreateDto";
import {AbsenceService} from "../../service/absence.service";
import {Validator} from "../../helper/validator";
import * as moment from "moment";

@Component({
  selector: 'app-user-absence-create',
  templateUrl: './user-absence-create.component.html',
  styleUrls: ['./user-absence-create.component.scss']
})
export class UserAbsenceCreateComponent {
  userId: string;
  user: UserDto;
  absenceDefinitionList: AbsenceDefinitionDto[];
  selectedAbsenceDefinition: AbsenceDefinitionDto;
  createAbsence: AbsenceCreateDto;
  partialTimeFrom: string;
  partialTimeTo: string;

  constructor(private userService: UserService, private absenceService: AbsenceService, private absenceDefinitionService: AbsenceDefinitionService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.userId = this.route.snapshot.paramMap.get('id') || "";
    this.user = new UserDto();
    this.absenceDefinitionList = [];
    this.selectedAbsenceDefinition = new AbsenceDefinitionDto();
    this.createAbsence = new AbsenceCreateDto();
    this.partialTimeFrom = "";
    this.partialTimeTo = "";

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
    });

    this.absenceDefinitionService.getAll().subscribe({
      next: response => {
        this.absenceDefinitionList = response;
        this.selectedAbsenceDefinition = this.absenceDefinitionList[0];
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
  }

  onSave() {
      try {
        this.createAbsence.UserId = this.userId;
        this.createAbsence.Timestamp = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        this.createAbsence.AbsenceDefinitionId = this.selectedAbsenceDefinition.Id;
        this.absenceService.create(this.createAbsence).subscribe({
          next: response => {
            this.messageService.add({severity: 'success', summary: 'Absence created', detail: ''});
          },
          error: err => {
            let detail: string = '';
            if(err.status === 401) {
              detail = 'Authentication needed';
            } else if(err.status === 400) {
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
    const isError: boolean = Validator.isEmpty(this.partialTimeFrom);

    if(isError) {
      this.createAbsence.PartialTimeFrom = "";
    } else {
      this.createAbsence.PartialTimeFrom = moment(this.partialTimeFrom).format('YYYY-MM-DDTHH:mm:ss');
    }
  }

  onPartialTimeToChange() {
    const isError: boolean = Validator.isEmpty(this.partialTimeTo);

    if(isError) {
      this.createAbsence.PartialTimeTo = "";
    } else {
      this.createAbsence.PartialTimeTo = moment(this.partialTimeTo).format('YYYY-MM-DDTHH:mm:ss');
    }
  }

}
