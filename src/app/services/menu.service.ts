import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.endpoint;
  }

  token: any = localStorage.getItem('token');

  Usuario(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    console.log(this.token.token);


    console.log(headers);

    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }
}
