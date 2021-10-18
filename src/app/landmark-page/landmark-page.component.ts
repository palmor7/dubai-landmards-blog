import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LandmarksService } from "src/service/landmarks.service";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-landmark-page',
  templateUrl: './landmark-page.component.html',
  styleUrls: ['./landmark-page.component.scss']
})
export class LandmarkPageComponent implements OnInit {

  landmark: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private landmarksService: LandmarksService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(mergeMap(params => this.landmarksService.getLandmark(params.get('id'))))
      .subscribe(landmark => {
        this.landmark = landmark;
      }, error => {
        this.router.navigate([`dubai-landmarks`]);
      });
  }
}