import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AbsenceDefinitionDto} from "../dto/AbsenceDefinitionDto";
import {BaseService} from "./base.service";
import {UserDto} from "../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class AbsenceDefinitionService extends BaseService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    super();
    this.baseUrl = "https://api4.allhours.com/api/v1";
  }

  getAll(): Observable<AbsenceDefinitionDto[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());
    return this.httpClient.get<AbsenceDefinitionDto[]>(this.baseUrl + "/AbsenceDefinitions", {headers: this.httpOptions.headers});
  }

  getById(id: string): Observable<AbsenceDefinitionDto> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());
    return this.httpClient.get<AbsenceDefinitionDto>(this.baseUrl + "/AbsenceDefinitions/" + id, { headers: this.httpOptions.headers });
  }
}
