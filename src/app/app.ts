import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SupabaseService} from './services/supabase/supabase.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  protected readonly title = signal('biz-service-platform-spa');
  session: any

  constructor(private readonly supabase: SupabaseService) {}
  async ngOnInit() {
    this.session = await this.supabase.getSession();
    console.log(this.session);
    this.supabase.authChanges((_, session) => (this.session = session))
  }

}
