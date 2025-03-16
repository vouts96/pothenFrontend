import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { UserNewSubmissionComponent } from './components/user-new-submission/user-new-submission.component';
import { AllSubmissionsComponent } from './components/all-submissions/all-submissions.component';
import { UserSubmissionsComponent } from './components/user-submissions/user-submissions.component';
import { EditMetadataComponent } from './components/edit-metadata/edit-metadata.component';
import { MiddlewareComponent } from './components/middleware/middleware.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: MiddlewareComponent,
  },
  {
    path: 'user/home',
    component: HomeUserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'user/new-submission',
    component: UserNewSubmissionComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'admin/home',
    component: HomeAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
     path: 'admin/all-submissions', 
    component: AllSubmissionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'admin/edit-metadata', 
    component: EditMetadataComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
 },
  {
    path: 'user/my-submissions', 
    component: UserSubmissionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
