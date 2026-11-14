import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent {
  @Output() volver = new EventEmitter<void>();

  asunto: string = '';
  mensaje: string = '';
  enviadoExito: boolean = false;

  regresar() {
    this.volver.emit();
  }

  enviarSolicitud() {
    if (!this.asunto || !this.mensaje) {
      alert('Por favor complete todos los campos del formulario.');
      return;
    }

    this.enviadoExito = true;
    setTimeout(() => {
      this.asunto = '';
      this.mensaje = '';
    }, 500);
  }
}