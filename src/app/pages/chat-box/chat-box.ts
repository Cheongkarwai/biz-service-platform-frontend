import {
  AfterViewChecked, AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  NgZone,
  OnInit, QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import {UIResource} from '../../services/business/business-ui';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {UiService} from '../../services/ui/ui-service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChatService} from '../../services/chat/chat-service';
import {McpService} from '../../services/mcp/mcp-service';


@Component({
  selector: 'app-chat-box',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ChatBox implements OnInit, AfterViewInit, AfterViewChecked {

  chatForm!: FormGroup;
  chatMessages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([] as ChatMessage[]);
  uiResources: Record<string, Observable<any>> = {};
  isLoading: boolean = false;
  private shouldScroll: boolean = false;

  private subscriptions: (() => void)[] = [];

  @ViewChildren('rendererElement') rendererElements!: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef;

  constructor(private uiService: UiService,
              private fb: FormBuilder,
              private chatService: ChatService,
              private mcpService: McpService) {
  }

  ngOnInit() {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.rendererElements.changes.subscribe(() => {
      console.log('Renderer elements changed:', this.rendererElements);
      this.attachListeners();
    });
    this.attachListeners();

  }

  private attachListeners() {
    // Clean up previous listeners
    this.subscriptions.forEach(unsub => unsub());
    this.subscriptions = [];

    this.rendererElements.forEach((el: ElementRef<HTMLElement>) => {
      const native = el.nativeElement;
      const listener = (event: any) => {
        if(event?.detail !== null){
          if(event?.detail?.type === 'tool'){
            if(event?.detail?.payload.toolName === 'getBusinessesByServiceId'){

            }
          }
        }
      };
      native.addEventListener('onUIAction', listener);
      this.subscriptions.push(() => native.removeEventListener('onUIAction', listener));
    });
  }

  private scrollToBottom(): void {
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } catch (err) {
      console.error('Smooth scroll failed', err);
    }
  }



  async sendMessage() {
    if (!this.chatForm.valid) return;

    const messageText = this.chatForm.get('message')!.value;

    // Append user message
    this.appendMessage(crypto.randomUUID(), {intent: 'unknown', text: messageText, sender: 'user'});

    this.chatForm.reset();
    this.isLoading = true;

    setTimeout(() => this.scrollToBottom(), 0);

    this.chatService.chat(messageText)
      .subscribe(response => {
        response.forEach(res => {
          const id = crypto.randomUUID();
          this.appendMessage(id, {intent: res.intent, text: res.message, sender: 'bot'});
          this.uiResources[id] = this.mcpService.readMcpResources(`ui://widgets/${res.intent}`)
            .pipe(map(resources=> {
              if(resources.contents.length === 0) return [];

              return resources.contents;
            }));
        });
        this.isLoading = false;
        this.shouldScroll = true;
      });
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      setTimeout(() => this.scrollToBottom(), 500);
      this.shouldScroll = false;
    }
  }

  private appendMessage(id: string, msg: { intent: string, text: string; sender: 'user' | 'bot' }) {
    const newMessage: ChatMessage = {
      ...msg,
      id: id
    };
    this.chatMessages$.next([...this.chatMessages$.value, newMessage]);

  }

  showAllServices() {
    this.chatForm.get('message')!.setValue('Show all services');
    this.sendMessage();
  }

  onIframeResize(event: any) {
    // Update div height dynamically
    //this.iframeHeight = event.height;
    console.log('Height updated:' + event ) ;
  }
}

interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  intent: string;
}
