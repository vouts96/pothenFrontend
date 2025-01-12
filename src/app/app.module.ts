import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { UserNewSubmissionComponent } from './components/user-new-submission/user-new-submission.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllSubmissionsComponent } from './components/all-submissions/all-submissions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    HomeUserComponent,
    UserNewSubmissionComponent,
    HeaderComponent,
    FooterComponent,
    AllSubmissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
