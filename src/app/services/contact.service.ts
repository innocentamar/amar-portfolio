import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://localhost:7187/api/contact';

  constructor(private http: HttpClient) {}

    sendMessage(data: any): Observable<any> {
      return this.http.post(this.apiUrl, data);
  }
}
