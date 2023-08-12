import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-redirect-links-list',
  templateUrl: './redirect-links-list.component.html',
  styleUrls: ['./redirect-links-list.component.scss']
})
export class RedirectLinksListComponent {
  @Input() links: { title: string, link: string }[] = [];
  @Input() color: 'clear' | 'dark' = 'clear';
}
