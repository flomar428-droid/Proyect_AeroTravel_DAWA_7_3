import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {
  @Output() volver = new EventEmitter<void>();

  regresar() {
    this.volver.emit();
  }
}