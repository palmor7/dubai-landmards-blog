import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { LandmarksService } from 'src/service/landmarks.service';

@Component({
  selector: 'app-update-landmark-form',
  templateUrl: './update-landmark-form.component.html',
  styleUrls: ['./update-landmark-form.component.scss']
})
export class UpdateLandmarkFormComponent implements OnInit {
  @Input()
  landmark;

  updateForm: FormGroup;
  submitted = false;
  loading = false;
  
  constructor(private formBuilder: FormBuilder, private landmarksService: LandmarksService, public activeModal: NgbActiveModal) {}
  
  ngOnInit() {
    this.buildForm();
  }

  get f() { return this.updateForm.controls; }

  buildForm() {
    this.updateForm = this.formBuilder.group({
      title: [this.landmark?.title ? this.landmark.title : '', Validators.required],
      shortInfo: [this.landmark?.short_info ? this.landmark.short_info : '', Validators.required],
      description: [this.landmark?.description ? this.landmark.description : '', Validators.required],
      url: [this.landmark?.url ? this.landmark.url : '', Validators.required],
      lat: [this.landmark?.location ? this.landmark.location[0] : '', Validators.required],
      lng: [this.landmark?.location ? this.landmark.location[1] : '', Validators.required],
      
    });
  }

  onUpdate() {
    this.submitted = true;
    this.loading = true;
    if (this.updateForm.invalid) {
        this.loading = false;
        return;
    }
    const loginRequest = {
      title: this.f.title.value,
      short_info: this.f.shortInfo.value,
      description: this.f.description.value,
      url: this.f.url.value,
      location: [this.f.lat.value, this.f.lng.value]
    };

    this.landmarksService.updateLandmark(this.landmark.objectId, loginRequest).subscribe(() => {
        this.loading = false;
        this.activeModal.close();
    }, noop);
}
}
