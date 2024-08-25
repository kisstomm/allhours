import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AbsenceDefinitionDto} from "../dto/AbsenceDefinitionDto";

@Injectable({
  providedIn: 'root'
})
export class AbsenceDefinitionService {
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

  getAll(): Observable<AbsenceDefinitionDto[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());
    return this.httpClient.get<AbsenceDefinitionDto[]>(this.baseUrl + "/AbsenceDefinitions", {headers: this.httpOptions.headers});
  }
}
