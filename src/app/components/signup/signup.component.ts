import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


export function confirmPasswordValidator(): ValidatorFn {
  return(control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return{
        dismatchPass: true
      }
    }
    return null;
  }
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {

    signupForm = new FormGroup({

      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)

    }, {validators: confirmPasswordValidator()})
  
  constructor( private authService: AuthenticationService, private router: Router){}

  ngOnInit(): void {
    }

  get name() {
    return this.signupForm.get('name');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }

  submit(){

    if(!this.signupForm.valid) return;

    const{email, password} = this.signupForm.value;

    this.authService.signUp(email, password).subscribe(() => {
      this.router.navigate(['/success']);
    
    });
  }
}