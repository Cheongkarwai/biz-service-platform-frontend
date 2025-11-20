import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar, SidebarOption} from '../../../components/sidebar/sidebar';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  options: SidebarOption[] = [
    {text: 'Manage users', route: '/admin/manage-users'},
    {text: 'Manage businesses', route: '/admin/manage-businesses'},
  ];
}
