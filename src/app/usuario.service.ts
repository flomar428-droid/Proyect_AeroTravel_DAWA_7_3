import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioValido = 'admin';
  private claveValida = '1234';
  private nombreUsuarioReal = 'Carlos Pérez';

  // Variables reactivas
  private logueadoSubject = new BehaviorSubject<boolean>(false);
  public logueado$ = this.logueadoSubject.asObservable();

  private nombreSubject = new BehaviorSubject<string>('');
  public nombreUsuario$ = this.nombreSubject.asObservable();

  private readonly TIMEOUT_LIMIT = 15 * 60 * 1000; // 15 minutos en milisegundos

  constructor() {
    this.verificarSesionAlCargar();
    this.inicializarControlInactividad();
  }

  // Verifica si hay sesión previa guardada al recargar con F5
  private verificarSesionAlCargar() {
    const sesionActiva = localStorage.getItem('aerotravel_logueado') === 'true';
    const ultimaAccion = localStorage.getItem('aerotravel_timestamp');

    if (sesionActiva && ultimaAccion) {
      const tiempoTranscurrido = Date.now() - parseInt(ultimaAccion, 10);
      
      if (tiempoTranscurrido < this.TIMEOUT_LIMIT) {
        // Sesión válida, la restauramos sin cerrar
        this.logueadoSubject.next(true);
        this.nombreSubject.next(this.nombreUsuarioReal);
        this.actualizarTimestamp();
      } else {
        // Expiró por más de 15 minutos reales de inactividad
        this.cerrarSesion();
      }
    }
  }

  public validarCredenciales(user: string, pass: string): boolean {
    if (user === this.usuarioValido && pass === this.claveValida) {
      localStorage.setItem('aerotravel_logueado', 'true');
      this.actualizarTimestamp();
      
      this.logueadoSubject.next(true);
      this.nombreSubject.next(this.nombreUsuarioReal);
      return true;
    }
    return false;
  }

  // Método exclusivo para cuando el usuario hace clic en el botón de cerrar sesión
  public cerrarSesion(): void {
    localStorage.removeItem('aerotravel_logueado');
    localStorage.removeItem('aerotravel_timestamp');
    
    this.logueadoSubject.next(false);
    this.nombreSubject.next('');
  }

  // Actualiza el registro de tiempo de la última actividad
  public actualizarTimestamp() {
    if (localStorage.getItem('aerotravel_logueado') === 'true') {
      localStorage.setItem('aerotravel_timestamp', Date.now().toString());
    }
  }

  // Control automático de los 15 minutos de inactividad
  private inicializarControlInactividad() {
    const eventos = ['click', 'keypress', 'mousemove', 'scroll'];
    eventos.forEach(evento => {
      window.addEventListener(evento, () => {
        const sesionActiva = localStorage.getItem('aerotravel_logueado') === 'true';
        if (sesionActiva) {
          const ultimaAccion = parseInt(localStorage.getItem('aerotravel_timestamp') || '0', 10);
          if (Date.now() - ultimaAccion > this.TIMEOUT_LIMIT) {
            this.cerrarSesion();
            alert('Su sesión ha expirado por 15 minutos de inactividad.');
          } else {
            this.actualizarTimestamp();
          }
        }
      });
    });
  }
}