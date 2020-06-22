import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './authguard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'register', component: LoginComponent, },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
