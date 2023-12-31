
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, SignIn } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.endpoint;
    }

    SignIn(user: SignIn): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/crearCuenta`, user);
    }

    login(user: any): Observable<string> {
      return this.http.post<any>(`${this.apiUrl}/IniciarSesion`, user);
    }
}
