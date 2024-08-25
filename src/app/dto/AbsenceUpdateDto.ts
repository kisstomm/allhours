export class AbsenceUpdateDto {
  Id?: string;
  UserId?: string;
  Timestamp?: string;
  AbsenceDefinitionId?: string;
  Origin?: number;
  Comment?: string;
  PartialTimeFrom?: string;
  PartialTimeTo?: string;
  PartialTimeDuration?: number;
  IsPartial?: boolean;
  OverrideHolidayAbsence?: boolean;

}
