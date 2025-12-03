import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Session} from '@supabase/supabase-js';
import {MatDialog} from '@angular/material/dialog';
import {Toast} from '../toast/toast';
import {AuthService} from '../../services/auth/auth-service';

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

  constructor(private supabase: SupabaseService,
              private authService: AuthService) {
  }

  async ngOnInit() {
    this.session = await this.supabase.getSession();
    this.profile = {
      name: this.session?.user.user_metadata['full_name'] ?? '',
      email: this.session?.user.email ?? ''
    }
  }

  logout() {
    this.authService.logout();
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
