import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { UserNewSubmissionComponent } from './components/user-new-submission/user-new-submission.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
