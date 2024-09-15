import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalSpaceComponent } from './personal-space/personal-space.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StatsComponent } from './stats/stats.component';
import { CaHistoryComponent } from './ca-history/ca-history.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ThanksComponent,
    ProfileComponent,
    PersonalSpaceComponent,
    RegisterComponent,
    LoginComponent,
    StatsComponent,
    CaHistoryComponent,
    ConfirmAccountComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
