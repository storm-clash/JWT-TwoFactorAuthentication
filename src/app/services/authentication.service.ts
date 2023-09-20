import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../pages/models/register-request';
import { Authenticationresponse } from '../pages/models/authentication-response';
import { VerificationRequest } from '../pages/models/verification-request';
import { AuthenticationRequest } from '../pages/models/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
//create conexion with backend

private baseUrl:string = 'http://localhost:3000/api/v1/auth'

  constructor( private http:HttpClient) { }

  register(registerRequest:RegisterRequest){

    return this.http.post<Authenticationresponse>(`${this.baseUrl}/register`,registerRequest);
  }

  login( authRequest: AuthenticationRequest){
    return this.http.post<Authenticationresponse>(`${this.baseUrl}/authenticate`,authRequest);
  }

  verifyCode( verificationRequest : VerificationRequest){
    return this.http.post<Authenticationresponse>(`${this.baseUrl}/verify`,verificationRequest);

  }

}
