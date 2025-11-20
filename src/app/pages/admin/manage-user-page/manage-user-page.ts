import { Component } from '@angular/core';
import {Table} from '../../../components/table/table';

@Component({
  selector: 'app-manage-user-page',
  imports: [
    Table
  ],
  templateUrl: './manage-user-page.html',
  styleUrl: './manage-user-page.css',
})
export class ManageUserPage {

  columns: string[] = ['name', 'email', 'role'];
  rows: any[] = [
    {name: 'Test', email: 'Test', role: 'Admin'},
    {name: 'Test', email: 'Test', role: 'User'},
  ];
}
