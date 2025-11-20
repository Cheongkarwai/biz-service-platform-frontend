import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Session} from '@supabase/supabase-js';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit{
  @Input() options: SidebarOption[] = [];

  profile!: Profile;
  session!: Session | null;

  constructor(private supabase: SupabaseService) {
  }

  async ngOnInit() {
    this.session = await this.supabase.getSession();
    this.session?.user.email && (this.profile.email = this.session.user.email);
    this.session?.user.user_metadata['full_name'] && (this.profile.name = this.session.user.user_metadata['full_name']);
    this.supabase.authChanges((_, session) => (this.session = session))
  }

}

export class Profile{
  name!: string;
  email!: string;
}

export class SidebarOption {
  text!: string | null;
  route!: string | null;
}
