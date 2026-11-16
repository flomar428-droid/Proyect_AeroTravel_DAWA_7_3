import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Vuelo } from '../../vuelos.service';
@Component({
  selector: 'app-editar-vuelo-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './editar-vuelo-dialog.html',
  styleUrls: ['./editar-vuelo-dialog.css']
})
export class EditarVueloDialogComponent {
  vueloEditando: Vuelo;

  constructor(
    public dialogRef: MatDialogRef<EditarVueloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vuelo
  ) {
    this.vueloEditando = { ...data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.vueloEditando);
  }
}