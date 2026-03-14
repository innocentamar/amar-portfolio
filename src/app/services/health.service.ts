import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  private apiUrl = 'https://localhost:7187/api/health';

  constructor(private http: HttpClient) {}

  checkHealth() {
    return this.http.get<any>(this.apiUrl);
  }
}
