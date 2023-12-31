import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listProduct: Product[] = []

  fechaActual: string = '';
  horaActual: string = '';
  vigencia: string = '';
  private intervalId: any;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.obtenerFechaHoraActual();
    this.actualizarVigencia();
    this.intervalId = setInterval(() => {
      this.obtenerFechaHoraActual();
    }, 1000);
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    })
  }


  actualizarVigencia() {
    const hoy = new Date();
    const inicioVigencia = new Date(hoy.getFullYear(), 0, 1);
    const finVigencia = new Date(hoy.getFullYear() + 1, 11, 31);

    this.vigencia = `Vigencia ${this.formatoFecha(inicioVigencia)} - ${this.formatoFecha(finVigencia)}`;
  }

  obtenerFechaHoraActual() {
    const now = new Date();
    this.fechaActual = this.formatoFecha(now);
    this.horaActual = this.formatoHora(now);
  }

  formatoFecha(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }

  formatoHora(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString('es-ES', options);
  }
}
