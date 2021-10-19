import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LandmarksService } from "src/service/landmarks.service";
import { mergeMap } from 'rxjs/operators';
import { LandmarkFullResource } from "src/models/landmark-full-resource.model";

@Component({
  selector: 'app-landmark-page',
  templateUrl: './landmark-page.component.html',
  styleUrls: ['./landmark-page.component.scss']
})
export class LandmarkPageComponent implements OnInit, OnDestroy {

  landmark: LandmarkFullResource;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private landmarksService: LandmarksService) {}

  ngOnInit() {
    document.body.classList.add('dashboard-bg');
    this.activatedRoute.paramMap.pipe(
      mergeMap(params => this.landmarksService.getLandmark(params.get('id')))
    ).subscribe(landmark => {
      this.landmark = landmark;
    }, () => {
      this.router.navigate([`dubai-landmarks`]);
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('dashboard-bg');
  }
}