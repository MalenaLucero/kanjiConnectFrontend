import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  @Input() text = 'Not added';
  @Input() state: 'warning' | 'success' = 'warning';
}
