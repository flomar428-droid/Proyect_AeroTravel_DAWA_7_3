import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Credenciales que pide el profesor
  private usuarioValido = 'admin';
  private claveValida = '1234';
  private nombreUsuarioReal = 'Carlos Pérez';

  // Variables reactivas para el estado de la sesión
  private logueadoSubject = new BehaviorSubject<boolean>(false);
  public logueado$ = this.logueadoSubject.asObservable();

  private nombreSubject = new BehaviorSubject<string>('');
  public nombreUsuario$ = this.nombreSubject.asObservable();

  constructor() {}

  // Método para validar el usuario y contraseña desde el Login
  public validarCredenciales(user: string, pass: string): boolean {
    if (user === this.usuarioValido && pass === this.claveValida) {
      this.logueadoSubject.next(true);
      this.nombreSubject.next(this.nombreUsuarioReal);
      return true;
    }
    return false;
  }

  // Método para cerrar sesión
  public cerrarSesion(): void {
    this.logueadoSubject.next(false);
    this.nombreSubject.next('');
  }
}