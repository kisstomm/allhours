import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../dto/UserDto";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    super();
    this.baseUrl = "https://api4.allhours.com/api/v1";
  }

  getAll(): Observable<UserDto[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());
    return this.httpClient.get<UserDto[]>(this.baseUrl + "/Users", { headers: this.httpOptions.headers });
  }

  getById(id: string): Observable<UserDto> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());
    return this.httpClient.get<UserDto>(this.baseUrl + "/Users/" + id, { headers: this.httpOptions.headers });
  }

  create(user: UserDto) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.loadToken());

    const body = JSON.stringify(user);
    return this.httpClient.post<UserDto>(this.baseUrl + "/Users", body, { headers: this.httpOptions.headers });
  }
}
