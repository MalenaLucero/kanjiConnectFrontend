import { TagsService } from 'src/app/study/services/tags.service';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from './study/services/lessons.service';
import { UserKanjiService } from './study/services/user-kanji.service';
import { ExpressionsService } from './study/services/expressions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private lessonsService: LessonsService,
              private tagsService: TagsService,
              private userKanjiService: UserKanjiService,
              private expressionsService: ExpressionsService) {}

  ngOnInit() {
    this.lessonsService.getLessons();
    this.tagsService.getTags();
  }
}
