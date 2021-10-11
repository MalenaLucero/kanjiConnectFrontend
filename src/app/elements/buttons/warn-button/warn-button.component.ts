import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warn-button',
  templateUrl: './warn-button.component.html'
})
export class WarnButtonComponent implements OnInit {
  @Input() text = 'Delete';

  constructor() { }

  ngOnInit(): void {
  }

}
