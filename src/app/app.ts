import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';

// Importar los componentes modulares
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { ReservasComponent } from './reservas/reservas.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { SoporteComponent } from './soporte/soporte.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    DashboardComponent,
    VuelosComponent,
    ReservasComponent,
    PromocionesComponent,
    SoporteComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  vistaActual: string = 'inicio';

  estaLogueado: boolean = false;
  nombreUsuarioLogueado: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.logueado$.subscribe((estado: boolean) => {
      this.estaLogueado = estado;
      // Si el usuario se loguea exitosamente, forzamos la vista a 'principal' (Mi Cuenta / Dashboard)
      if (estado) {
        this.vistaActual = 'principal';
      }
    });

    this.usuarioService.nombreUsuario$.subscribe((nombre: string) => {
      this.nombreUsuarioLogueado = nombre;
    });
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.vistaActual = 'inicio';
  }
}