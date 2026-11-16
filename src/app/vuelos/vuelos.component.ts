import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VuelosService, Vuelo } from '../vuelos.service';
import { EditarVueloDialogComponent } from './editar-vuelo-dialog/editar-vuelo-dialog';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css'],
})
export class VuelosComponent implements OnInit {
  @Output() volver = new EventEmitter<void>(); // <--- Añade esto

  displayedColumns: string[] = ['codigo', 'origen', 'destino', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Vuelo>([]);

  constructor(
    private vuelosService: VuelosService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.vuelosService.vuelos$.subscribe((vuelos: Vuelo[]) => {
      this.dataSource.data = vuelos;
    });
  }

  regresar() {
    this.volver.emit();
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogoEditar(vuelo: Vuelo) {
    const dialogRef = this.dialog.open(EditarVueloDialogComponent, {
      width: '350px',
      data: vuelo,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.vuelosService.actualizarVuelo(resultado);
      }
    });
  }

  eliminarVuelo(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este vuelo?')) {
      this.vuelosService.eliminarVuelo(id);
    }
  }
}
