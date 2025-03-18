import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges {
  selectedNumber: number = 10; // 10 resultados por defecto
  selectedPageNumber: number = 1; // primera página por defecto
  pagesNumber: number[] = [];

  @Input() reset: boolean = false;
  @Input() resultsLength = 0;

  @Output() resultNumberChanged = new EventEmitter<number>();
  @Output() pageNumberChanged = new EventEmitter<number>();

  ngOnInit(): void {
    this.calculatePages();

    // emito nuevo estado por defecto
    this.resultNumberChanged.emit(this.selectedNumber);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] && changes['reset'].currentValue) {
      this.setPageNumber(1);
      this.setResultNumber(10);
    }

    if (changes['resultsLength'] && changes['resultsLength'].currentValue) {
      this.setPageNumber(1);
      this.setResultNumber(10);
    }
  }

  setResultNumber(value: number) {
    // actualizo el número seleccionado
    this.selectedNumber = value;

    // recalculo las páginas
    this.calculatePages();

    // selecciono por defecto la primera página
    this.setPageNumber(1);

    // emito un nuevo valor
    this.resultNumberChanged.emit(value);
  }

  setPageNumber(value: number) {
    if (value < 1 || value > this.pagesNumber.length) {
      return; // evita cambiar si está fuera de los límites
    }

    this.selectedPageNumber = value;

    // emito un nuevo valor
    this.pageNumberChanged.emit(this.selectedPageNumber);
  }

  calculatePages() {
    // obtengo el número de paginas totales según el número de empleados
    const numberOfPages = Math.ceil(this.resultsLength / this.selectedNumber);

    // obtengo el array de las páginas
    this.pagesNumber = Array(numberOfPages).fill(1).map((x, i) => i + 1);
  }
}
