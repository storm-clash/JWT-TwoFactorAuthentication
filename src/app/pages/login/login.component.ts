import { Component } from '@angular/core';
import { AuthenticationRequest } from '../models/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Authenticationresponse } from '../models/authentication-response';
import { VerificationRequest } from '../models/verification-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {};
  otpCode :any;
  authResponse: Authenticationresponse = {};
  message:string='';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  authenticate() {
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.token as string);
            this.router.navigate(['welcome']);
          }
        },
        error: (errorData) => {
          
          this.message = errorData;
          this.router.navigate(['login']);
        },
      });
  }

  verifyCode() {
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Account created successfully\nYou will be redirected to the welcome pague in 3 seconds';
          localStorage.setItem('token', response.token as string);
          this.router.navigate(['welcome']);
        },
        error: (errorData) => {
          
          this.message = errorData;
          this.router.navigate(['login']);
        },
      });
  }

}
