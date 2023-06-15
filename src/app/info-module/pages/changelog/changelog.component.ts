import { Component } from '@angular/core';
import { changelogData } from './changelog-data';
import { ChangelogItem } from '../../models/changelog-item.model';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent {
  public data: ChangelogItem[] = [];

  constructor() {
    this.data = changelogData;
  }

}
