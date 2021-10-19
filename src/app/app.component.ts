import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { LandmarksService } from 'src/service/landmarks.service';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  isInHomePage: boolean;
  loading = false;

  constructor(private modalService: NgbModal, public landmarksService: LandmarksService, private router: Router) {}
  
  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.isInHomePage = event.urlAfterRedirects === '/dubai-landmarks';
    });

    this.landmarksService.isLoggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  
    this.landmarksService.checkUserLoggedIn();
  }

  openLoginForm() {
    this.modalService.open(LoginModalComponent);
  }

  logout() {
    this.loading = true;
    this.landmarksService.logout().subscribe(() => {
      localStorage.removeItem('session-token');
      this.landmarksService.checkUserLoggedIn();
      this.router.navigate(['/']);
      this.loading = false;
    });
  }
}
