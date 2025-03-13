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
  searchTypeControl = new FormControl('name');

  @Output() typeChanged = new EventEmitter<string>();
  @Output() valueChanged = new EventEmitter<string>();

  constructor() {
    this.searchTypeControl.valueChanges
      .subscribe(value => {
        // emite un nuevo valor sólo si existe valor
        if (value === null || value === undefined) {
          return;
        }
        this.typeChanged.emit(value)
      });

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
  }

  clearFilter() {
    this.searchControl.setValue('');
    this.valueChanged.emit('')
  }
}
