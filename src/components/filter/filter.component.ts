import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnChanges {
  searchControl = new FormControl('');
  departmentSelectControl = new FormControl('');
  selectedType: string = 'name';
  selectedTypeLabel: string = 'Nombre';

  @Input() reset: boolean = false;

  @Output() typeChanged = new EventEmitter<string>();
  @Output() valueChanged = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        if (value === null || value === undefined) {
          return;
        }

        this.valueChanged.emit(value)
      });

    this.departmentSelectControl.valueChanges
      .subscribe(value => {
        if (value === null || value === undefined) {
          return;
        }

        this.valueChanged.emit(value);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] && changes['reset'].currentValue) {
      this.clearFilter();
    }
  }

  setSearchType(value: string, label: string) {
    this.selectedType = value;
    this.selectedTypeLabel = label;

    this.typeChanged.emit(value);
  }

  clearFilter() {
    this.searchControl.reset();
    this.departmentSelectControl.reset();
  }
}
