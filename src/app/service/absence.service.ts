import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../dto/UserDto";
import {AbsenceDto} from "../dto/AbsenceDto";
import {AbsenceCreateDto} from "../dto/AbsenceCreateDto";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService extends BaseService{
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    super();
    this.baseUrl = "https://api4.allhours.com/api/v1";
  }

  getAll(): Observable<AbsenceDto[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());
    return this.httpClient.get<AbsenceDto[]>(this.baseUrl + "/Absences", { headers: this.httpOptions.headers });
  }

  getAllFilterAbsenceDate(filterAbsenceFrom: string, filterAbsenceTo: string): Observable<AbsenceDto[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());

    if(filterAbsenceFrom) {
      this.httpOptions.params = new HttpParams().set('dateFrom', filterAbsenceFrom);
    }
    if(filterAbsenceTo) {
      this.httpOptions.params = this.httpOptions.params.append('dateTo', filterAbsenceTo);
    }

    return this.httpClient.get<AbsenceDto[]>(this.baseUrl + "/Absences", { headers: this.httpOptions.headers, params: this.httpOptions.params });
  }

  create(absence: AbsenceCreateDto) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());

    const body = JSON.stringify(absence);
    return this.httpClient.post<UserDto>(this.baseUrl + "/Absences", body, { headers: this.httpOptions.headers });
  }
}
