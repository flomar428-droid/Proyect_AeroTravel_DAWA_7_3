import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent {
  @Output() volver = new EventEmitter<void>();

  regresar() {
    this.volver.emit();
  }
}