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
import { UserSubmissionsComponent } from './components/user-submissions/user-submissions.component';
import { EditMetadataComponent } from './components/edit-metadata/edit-metadata.component';
import { MiddlewareComponent } from './components/middleware/middleware.component';
import { ChatComponent } from './components/chat/chat.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    HomeUserComponent,
    UserNewSubmissionComponent,
    HeaderComponent,
    FooterComponent,
    AllSubmissionsComponent,
    UserSubmissionsComponent,
    EditMetadataComponent,
    MiddlewareComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MarkdownModule.forRoot() // Enables Markdown rendering
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
