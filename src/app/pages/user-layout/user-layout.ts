import { Component } from '@angular/core';
import {Navbar} from "../../components/navbar/navbar";
import {Footer} from '../../components/footer/footer';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [
    Navbar,
    Footer,
    RouterOutlet
  ],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {

}
