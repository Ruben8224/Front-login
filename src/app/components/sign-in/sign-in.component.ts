import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignIn, User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  matricula: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  file: File | any = null;
  imageURL: string | any;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private storage: AngularFireStorage,
    ) { }

  ngOnInit(): void {
  }

  async addUser() {

    if (this.correo == '' || this.matricula == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    await this.SubirImagenFirestore();

    // Creamos el objeto
    const user: SignIn = {
      correo: this.correo,
      matricula: this.matricula,
      contraseña: this.password,
      url_imagen: this.imageURL
    }

    this.loading = true;
    this._userService.SignIn(user).subscribe({
      next: (v) => {
        console.log(v)
        this.loading = false;
        this.toastr.success(`El usuario ${this.correo} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }

  async SubirImagenFirestore() {
    if (this.file) {
      const filePath = `images/${this.file.name}`;
      const fileRef = this.storage.ref(filePath);
      try {
        await this.storage.upload(filePath, this.file);
        const downloadUrl = await fileRef.getDownloadURL().toPromise();
        this.imageURL = downloadUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  GuardarImagen(event: any) {
    this.file = event.target.files[0];
    this.MostrarImagen(this.file);
  }

  MostrarImagen(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageURL = e.target.result;
    };
    reader.readAsDataURL(file);
  }

}
