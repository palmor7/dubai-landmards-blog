import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandmarksService } from 'src/service/landmarks.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandmarkCardComponent } from './landmark-card/landmark-card.component';
import { FullScreenImgComponent } from './full-screen-img/full-screen-img.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routing.module';
import { LandmarkPageComponent } from './landmark-page/landmark-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard';
import { initApplicationData } from './app-initializer';
import { UpdateLandmarkFormComponent } from './update-landmark-form/update-landmark-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LandmarkCardComponent,
    FullScreenImgComponent,
    LandmarkPageComponent,
    LoginModalComponent,
    DashboardComponent,
    UpdateLandmarkFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    LandmarksService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplicationData,
      deps: [LandmarksService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
