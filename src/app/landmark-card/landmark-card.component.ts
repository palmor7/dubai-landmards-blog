import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Landmark } from "src/models/landmark.model";

@Component({
  selector: 'app-landmark-card',
  templateUrl: './landmark-card.component.html',
  styleUrls: ['./landmark-card.component.scss']
})
export class LandmarkCardComponent implements OnInit {
  @Input()
  landmark: Landmark;
  @Input()
  isInFullDescription = false;

  viewerOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onTitleClick() {
    this.router.navigate([`dubai-landmarks/${this.landmark.objectId}`]);
  }
}