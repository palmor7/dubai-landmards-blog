import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Landmark } from 'src/models/landmark.model';
import { tap } from 'rxjs/operators';
import { LandmarkFullResource } from 'src/models/landmark-full-resource.model';

@Injectable({
  providedIn: 'root',
})
export class LandmarksService {
    private isLoggedIn: Subject<boolean> = new Subject();
    public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

    private landmarks: BehaviorSubject<Landmark[]> = new BehaviorSubject([]);
    public landmarks$: Observable<Landmark[]> = this.landmarks.asObservable();

    constructor(private http: HttpClient) {}

    getAllLandmarks(): void {
        this.http.get<Landmark[]>('https://frontend-2376.instashop.ae/api/landmarks').subscribe(landmarks => {
            this.landmarks.next(landmarks);
          }
        );
    }

    getLandmark(id: string): Observable<LandmarkFullResource> {
      return this.http.get<LandmarkFullResource>(`https://frontend-2376.instashop.ae/api/landmarks/${id}`);
    }

    updateLandmark(id, body): Observable<any> {
      const sessionToken = localStorage.getItem('session-token');
      let headers = {};
      if (sessionToken) {
        headers = {
          'x-sessionToken': sessionToken
        }
      }
      const requestOptions = {
        headers: new HttpHeaders(headers),
      };

      return this.http.put(`https://frontend-2376.instashop.ae/api/landmarks/${id}`, body, requestOptions).pipe(
        tap(() => this.getAllLandmarks())
      );
    }

    login(loginRequest): Observable<any> {
      return this.http.post(`https://frontend-2376.instashop.ae/api/users/login`, loginRequest);
    }

    logout(): Observable<any> {
      const sessionToken = localStorage.getItem('session-token');
      let headers = {};
      if (sessionToken) {
        headers = {
          'x-sessionToken': sessionToken
        }
      }
      const requestOptions = {
        headers: new HttpHeaders(headers),
      };

      return this.http.get('https://frontend-2376.instashop.ae/api/users/logout', requestOptions);
    }
    
    checkUserLoggedIn(): void {
      this.isLoggedIn.next(!!localStorage.getItem('session-token'));
    }
}