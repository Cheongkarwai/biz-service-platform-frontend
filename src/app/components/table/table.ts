import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Business} from '../../model/business';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input()
  columns: any [] = [];

  @Input()
  rows: any [] = [];

  @Output() contextMenu = new EventEmitter<any>();

  @Output() edit = new EventEmitter<any>();

  @Input() canEditRow: (row: any) => boolean = () => true;


  openEditDialog(item: any) {
    this.edit.emit(item);
  }
}
