import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SuccessSignupComponent } from './components/success-signup/success-signup.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['userhome']);


const routes: Routes = [

  {path:'', pathMatch:'full', component:HomepageComponent},
  {path:'login', component:LoginComponent, ...canActivate(redirectToHome)},
  {path:'signup', component:SignupComponent, ...canActivate(redirectToHome)},
  {path:'userhome', component:UserhomeComponent, ...canActivate(redirectToLogin)},
  {path:'success', component:SuccessSignupComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
