import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenDto} from "../dto/TokenDto";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  baseUrl: string;
  httpOptions: { headers: HttpHeaders, params: HttpParams, responseType: string };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "https://login.allhours.com";

    this.httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
      responseType: ''
    };

    this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    this.httpOptions.headers = this.httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    this.httpOptions.headers = this.httpOptions.headers.set('Access-Control-Allow-Methods', 'HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS');
  }

  getClientId() {
    return localStorage.getItem('clientId') || "";
  }

  getClientSecret() {
    return localStorage.getItem('clientSecret') || "";
  }

  getBearerToken(): Observable<TokenDto> {
    const body = new URLSearchParams();
    body.set('client_id', this.getClientId());
    body.set('client_secret', this.getClientSecret());
    body.set('scope', 'api');
    body.set('grant_type', 'client_credentials');
    return this.httpClient.post<TokenDto>("/connect/token", body, { headers: this.httpOptions.headers });
  }

  saveToken(tokenDto: TokenDto) {
    localStorage.setItem('token', tokenDto.access_token ?? "");
  }

  removeToken() {
    localStorage.removeItem('token');
  }


}
