import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SupabaseService} from './services/supabase/supabase.service';
import {CommonModule} from '@angular/common';
import {BusinessUi} from './services/business/business-ui';
import {McpService} from './services/mcp/mcp-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  protected readonly title = signal('biz-service-platform-spa');
  session: any

  constructor(private readonly supabase: SupabaseService,
              private readonly mcpService: McpService) {}
  async ngOnInit() {
    this.session = await this.supabase.getSession();
    this.supabase.authChanges((_, session) => (this.session = session));

    // await this.mcpService.readMcpResources("ui://widgets/show_services");

  }




}

