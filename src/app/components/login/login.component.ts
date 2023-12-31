import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  matricula: string = '';
  carrera: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  login() {

    // Validamos que el usuario ingrese datos
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Creamos el body

    let user: User = {
      correo: this.username,
      contraseña: this.password
    }

    let inicioSesion = [];
    inicioSesion[0] = user.correo;
    inicioSesion[1] = user.contraseña;

    this.loading = true;
    this._userService.login(inicioSesion).subscribe({
      next: (token: any) => {
        localStorage.setItem('token', token.token);
        this.router.navigate(['/dashboard'])
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false
      }
    })
  }



}
