import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuarioInput: string = '';
  claveInput: string = '';
  mensajeLogin: string = '';
  tipoMensaje: 'exito' | 'error' | 'info' | '' = '';

  @Output() loginExitoso = new EventEmitter<void>();

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef // Inyectamos el detector de cambios para refrescar la vista al instante
  ) {}

  validarCredenciales() {
    // 1. Mostrar mensaje inicial de validación
    this.mensajeLogin = 'Se procederá a validar las credenciales de acceso...';
    this.tipoMensaje = 'info';
    this.cdr.detectChanges(); // Forzar actualización visual inmediata

    // 2. Simular el proceso de validación con el servicio
    setTimeout(() => {
      const exito = this.usuarioService.validarCredenciales(this.usuarioInput, this.claveInput);

      if (exito) {
        this.mensajeLogin = '¡Acceso concedido! Redirigiendo a tu cuenta...';
        this.tipoMensaje = 'exito';
        this.cdr.detectChanges(); // Actualizar color verde de éxito

        setTimeout(() => {
          this.loginExitoso.emit();
        }, 800);
      } else {
        this.mensajeLogin = 'Error en las credenciales. Verifica tu usuario y clave.';
        this.tipoMensaje = 'error';
        this.cdr.detectChanges(); // Actualizar color rojo de error
      }
    }, 600);
  }
}