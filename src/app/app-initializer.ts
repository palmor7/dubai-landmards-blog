import { LandmarksService } from "src/service/landmarks.service";

export function initApplicationData(landmarksService: LandmarksService) {
  return function () {
    return landmarksService.getAllLandmarks();
  };
}
