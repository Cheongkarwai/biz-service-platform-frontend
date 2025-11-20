import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input()
  columns: string [] = [];

  @Input()
  rows: any [] = [];
}
