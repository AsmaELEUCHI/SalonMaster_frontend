import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ThanksComponent } from './thanks/thanks.component';
import { PersonalSpaceComponent } from './personal-space/personal-space.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'register' , component : RegisterComponent },
  {path:'confirm' , component : ConfirmAccountComponent  },
  {path:'login' , component :  LoginComponent},
  {path:'thanks', component: ThanksComponent},
  {path:'personalSpace', component: PersonalSpaceComponent},
  {path:'api/users/update-password', component: UpdatePasswordComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
