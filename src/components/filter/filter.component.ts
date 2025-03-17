import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  searchControl = new FormControl('');
  departmentSelectControl = new FormControl('');
  selectedType: string = 'name';
  selectedTypeLabel: string = 'Nombre';

  @Output() clearChanged = new EventEmitter<boolean>();
  @Output() typeChanged = new EventEmitter<string>();
  @Output() valueChanged = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        // emite un nuevo valor sólo si existe valor
        if (value === null || value === undefined) {
          return;
        }

        this.valueChanged.emit(value)
      });

    this.departmentSelectControl.valueChanges
      .subscribe(value => {
        // emite un nuevo valor sólo si existe valor
        if (value === null || value === undefined) {
          return;
        }

        this.valueChanged.emit(value);
      });
  }

  setSearchType(value: string, label: string) {
    this.selectedType = value;
    this.selectedTypeLabel = label;

    this.searchControl.reset();
    this.departmentSelectControl.reset();

    this.clearChanged.emit(true);
    this.typeChanged.emit(value);
  }

  clearFilter() {
    this.searchControl.reset();
    this.departmentSelectControl.reset();

    this.clearChanged.emit(true);
  }
}
