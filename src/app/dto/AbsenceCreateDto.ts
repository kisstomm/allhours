export class AbsenceCreateDto {
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
