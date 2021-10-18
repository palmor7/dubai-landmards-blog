import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandmarkPageComponent } from './landmark-page/landmark-page.component';

const routes: Routes = [
  { path: 'dubai-landmarks', component: HomePageComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  { path: 'dubai-landmarks/:id', component: LandmarkPageComponent },
  { path: '', redirectTo: 'dubai-landmarks', pathMatch: 'full' },
  { path: '**', redirectTo: 'dubai-landmarks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
