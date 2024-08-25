import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../dto/UserDto";
import {AbsenceDto} from "../dto/AbsenceDto";
import {AbsenceCreateDto} from "../dto/AbsenceCreateDto";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  baseUrl: string;
  httpOptions: { headers: HttpHeaders, params: HttpParams, responseType: string };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "https://api4.allhours.com/api/v1";

    this.httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
      responseType: ''
    };

    this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');

  }

  loadToken() {
    return localStorage.getItem('token') || "";
  }

  getAll(): Observable<AbsenceDto[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());
    return this.httpClient.get<AbsenceDto[]>(this.baseUrl + "/Absences", { headers: this.httpOptions.headers });
  }

  create(absence: AbsenceCreateDto) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());

    const body = JSON.stringify(absence);
    return this.httpClient.post<UserDto>(this.baseUrl + "/Absences", body, { headers: this.httpOptions.headers });
  }
}
