import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Controla qué vista se muestra ('inicio', 'login', 'destinos')
  vistaActual: string = 'inicio';

  // Función para cambiar de pantalla mediante los botones
  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  // Alerta exacta solicitada por el profesor al hacer clic en Aceptar en el Login
  validarCredenciales() {
    alert("Se procederá a validar las credenciales de acceso");
  }
}