import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './Auth/auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';



const routes: Routes = [

  { path:'home', component: MainPageComponent},
  { path:'c_dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path:'login', component: LoginComponent },
  { path: 'signup', component:SignUpComponent},
  { path: 'u_dashboard', component:UserDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
