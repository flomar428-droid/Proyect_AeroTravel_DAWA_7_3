import { Component, OnInit, NgZone } from '@angular/core';
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
export class AppComponent implements OnInit {
  vistaActual: string = 'inicio';

  estaLogueado: boolean = false;
  nombreUsuarioLogueado: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private ngZone: NgZone // Inyectamos NgZone para sincronizar el historial con Angular
  ) {}

  ngOnInit(): void {
    // 1. Nos suscribimos al estado de sesión (Sobrevive al F5 con localStorage)
    this.usuarioService.logueado$.subscribe((estado: boolean) => {
      this.estaLogueado = estado;
      
      if (estado && this.vistaActual === 'inicio') {
        this.vistaActual = 'principal';
      }
    });

    this.usuarioService.nombreUsuario$.subscribe((nombre: string) => {
      this.nombreUsuarioLogueado = nombre;
    });

    // 2. Inicializamos el estado base en el historial del navegador
    const vistaInicial = this.estaLogueado ? 'principal' : 'inicio';
    window.history.replaceState({ vista: vistaInicial }, '');

    // 3. Escuchamos las flechas "Atrás" y "Adelante" usando NgZone para forzar el renderizado
    window.addEventListener('popstate', (event) => {
      this.ngZone.run(() => {
        if (event.state && event.state.vista) {
          this.vistaActual = event.state.vista;
        } else {
          this.vistaActual = this.estaLogueado ? 'principal' : 'inicio';
        }
      });
    });
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
    // Registramos el cambio en el historial nativo del navegador
    window.history.pushState({ vista: vista }, '');
    window.scrollTo(0, 0);
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.vistaActual = 'inicio';
    window.history.pushState({ vista: 'inicio' }, '');
  }
}

// Exportación requerida para compatibilidad con main.ts
export { AppComponent as App };