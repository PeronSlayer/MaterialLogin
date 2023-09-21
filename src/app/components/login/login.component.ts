import { Component, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { NonNullableFormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.auth
      .login(email, password)
      .subscribe(() => {
        this.router.navigate(['/userhome']);
      });
  }
}