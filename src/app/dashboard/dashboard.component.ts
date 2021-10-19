import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Landmark } from 'src/models/landmark.model';
import { LandmarksService } from 'src/service/landmarks.service';
import { UpdateLandmarkFormComponent } from '../update-landmark-form/update-landmark-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  loading = false;
  landmarks$: Observable<Landmark[]>;
  updatingLandmarkIndex: number;

  constructor(public landmarksService: LandmarksService, private modalService: NgbModal) {}
  
  ngOnInit() {
    document.body.classList.add('dashboard-bg');
    this.landmarks$ = this.landmarksService.landmarks$;
  }

  ngOnDestroy() {
    document.body.classList.remove('dashboard-bg');
  }

  onClick(landmark, index) {
    this.updatingLandmarkIndex = index;
    this.loading = true;
    this.landmarksService.getLandmark(landmark.objectId).subscribe(landmark => {
      const modalRef = this.modalService.open(UpdateLandmarkFormComponent, {size: 'lg'});
      this.loading = false;
      modalRef.componentInstance.landmark = landmark;
    });
  }
}
