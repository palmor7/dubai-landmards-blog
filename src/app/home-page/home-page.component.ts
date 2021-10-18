import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Landmark } from 'src/models/landmark.model';
import { LandmarksService } from 'src/service/landmarks.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  landmarks$: Observable<Landmark[]>;
  constructor(private landmarksService: LandmarksService) {}
  
  ngOnInit() {
    this.landmarks$ = this.landmarksService.landmarks$;
  }
}
