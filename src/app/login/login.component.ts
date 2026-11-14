import { Component, Output, EventEmitter } from '@angular/core';
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
  tipoMensaje: 'exito' | 'error' | '' = '';

  @Output() loginExitoso = new EventEmitter<void>();

  constructor(private usuarioService: UsuarioService) {}

  validarCredenciales() {
    this.mensajeLogin = 'Se procederá a validar las credenciales de acceso...';
    this.tipoMensaje = '';

    setTimeout(() => {
      const exito = this.usuarioService.validarCredenciales(this.usuarioInput, this.claveInput);

      if (exito) {
        this.mensajeLogin = '¡Acceso concedido! Redirigiendo a tu cuenta...';
        this.tipoMensaje = 'exito';
        
        setTimeout(() => {
          this.loginExitoso.emit();
        }, 600);
      } else {
        this.mensajeLogin = 'Error en las credenciales. Verifica tu usuario y clave.';
        this.tipoMensaje = 'error';
      }
    }, 400);
  }
}