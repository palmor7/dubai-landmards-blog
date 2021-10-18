import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LandmarksService } from 'src/service/landmarks.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  serverError:  string;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private landmarksService: LandmarksService,
      private router: Router,
      private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.serverError = '';
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    const loginRequest = {
      username: this.f.username.value,
      password: this.f.password.value
    };

    this.landmarksService.login(loginRequest).subscribe((user) => {
      this.activeModal.close();
      this.loading = false;
      localStorage.setItem('session-token', user.sessionToken);
      this.landmarksService.setUserLoggedIn();
      this.router.navigate(['/dashboard']);
    }, error => {
        this.loading = false;
        this.loginForm.reset();
        this.serverError = error.error.errorMessage.message;
    });
  }

  
}
