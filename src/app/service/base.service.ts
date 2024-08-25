import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../dto/UserDto";
import {AbsenceDto} from "../dto/AbsenceDto";
import {AbsenceCreateDto} from "../dto/AbsenceCreateDto";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  httpOptions: { headers: HttpHeaders, params: HttpParams, responseType: string };

  constructor() {

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

}
