import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() nombreUsuario: string = '';
  @Output() navegar = new EventEmitter<string>();

  irA(vista: string) {
    this.navegar.emit(vista);
  }
}