import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent {
  @Input() employee!: any;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  editEmployee() {
    this.edit.emit(this.employee);
  }

  deleteEmployee() {
    this.delete.emit(this.employee.id);
  }
}

