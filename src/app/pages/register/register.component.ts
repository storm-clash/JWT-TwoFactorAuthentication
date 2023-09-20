import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { Authenticationresponse } from '../models/authentication-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { VerificationRequest } from '../models/verification-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerRequest : RegisterRequest ={};

  authResponse : Authenticationresponse ={};

  message:string ='';

  otpCode:string ='';

  constructor(private authService : AuthenticationService,
    private router :Router
    
    ){}

  registerUser(){
    this.message='';
    this.authService.register(this.registerRequest)
    .subscribe({
      next:( response : Authenticationresponse) =>{
        if( response){
        this.authResponse = response;
      }else {
          //inform the user
          this.message = 'Account created successfully\nYou will be redirected to the login in 3 seconds';
          setTimeout(()=>{
            this.router.navigate(['login']);
          }, 3000)
      }

        
      }
    });
  }
  verifyTfa(){
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email:this.registerRequest.email,
      code:this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
    .subscribe({
      next: (response:Authenticationresponse)=>{
        this.message = 'Account created successfully\nYou will be redirected to the welcome pague in 3 seconds';
        setTimeout(()=>{
          localStorage.setItem('token',response.token as string);
          this.router.navigate(['welcome']);
        }, 3000);
      }
    });
  }

}
