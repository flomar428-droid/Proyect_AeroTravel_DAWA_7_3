import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Vuelo {
  id: number;
  codigo: string;
  origen: string;
  destino: string;
  fecha: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  // Arreglo inicial con datos quemados (cumple con las 5 columnas requeridas)
  private vuelosData: Vuelo[] = [
    { id: 1, codigo: 'AV-101', origen: 'Quito (UIO)', destino: 'Guayaquil (GYE)', fecha: '2026-11-20', estado: 'Confirmado' },
    { id: 2, codigo: 'AV-202', origen: 'Guayaquil (GYE)', destino: 'Miami (MIA)', fecha: '2026-11-22', estado: 'A tiempo' },
    { id: 3, codigo: 'AV-303', origen: 'Cuenca (CUE)', destino: 'Galápagos (GPS)', fecha: '2026-11-25', estado: 'En espera' },
    { id: 4, codigo: 'AV-404', origen: 'Quito (UIO)', destino: 'Bogotá (BOG)', fecha: '2026-11-28', estado: 'Confirmado' },
    { id: 5, codigo: 'AV-505', origen: 'Manta (MEC)', destino: 'Quito (UIO)', fecha: '2026-12-01', estado: 'A tiempo' }
  ];

  private vuelosSubject = new BehaviorSubject<Vuelo[]>(this.vuelosData);
  vuelos$ = this.vuelosSubject.asObservable();

  constructor() { }

  // Obtener la lista actual
  getVuelos(): Vuelo[] {
    return this.vuelosData;
  }

  // Eliminar un registro
  eliminarVuelo(id: number) {
    this.vuelosData = this.vuelosData.filter(v => v.id !== id);
    this.vuelosSubject.next(this.vuelosData);
  }

  // Actualizar un registro existente
  actualizarVuelo(vueloActualizado: Vuelo) {
    const index = this.vuelosData.findIndex(v => v.id === vueloActualizado.id);
    if (index !== -1) {
      this.vuelosData[index] = vueloActualizado;
      this.vuelosSubject.next(this.vuelosData);
    }
  }

  // Agregar un nuevo registro (opcional para completar el CRUD)
  agregarVuelo(nuevoVuelo: Omit<Vuelo, 'id'>) {
    const nuevoId = this.vuelosData.length > 0 ? Math.max(...this.vuelosData.map(v => v.id)) + 1 : 1;
    const vueloCompleto: Vuelo = { id: nuevoId, ...nuevoVuelo };
    this.vuelosData.push(vueloCompleto);
    this.vuelosSubject.next(this.vuelosData);
  }
}