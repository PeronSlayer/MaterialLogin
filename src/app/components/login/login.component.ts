import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  loginForm = this.fb.group ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
 
  
  constructor(
    private router: Router,
    private fb: NonNullableFormBuilder,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
  submit(){
    const { email, password } = this.loginForm.value;
    if(!this.loginForm.valid || !email || !password){
      return
    }
    this.authService.login(email, password).subscribe(()=> {
      this.router.navigate(['/homepage']);
    });

  }

}
