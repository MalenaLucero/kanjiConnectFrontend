import { TagsService } from 'src/app/study/services/tags.service';
import { Injectable } from '@angular/core';
import { CardFilter } from 'src/app/study/models/card-filter.model';
import { Tag } from 'src/app/study/models/tag.model';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardFilterService {
  private user: string;

  constructor(private tagsService: TagsService,
    private authService: AuthService) {
    this.user = this.authService.getUserId();
  }

  generateFilter(formValues: any): CardFilter {
    const cardFilter: CardFilter = { user: this.user };
    cardFilter.type = formValues.type;
    cardFilter.reviewType = formValues.reviewType;
    if (formValues.lesson !== '') {
      cardFilter.lesson = formValues.lesson;
    }
    const checkedTags: string[] = Object.keys(formValues.tags).filter(key =>
      formValues.tags[key] ? key : null
    );
    if (checkedTags.length > 0) {
      let tags: Tag[] = [];
      this.tagsService.tags$.pipe(take(1)).subscribe(res => tags = res)
      const tagIds: string[] = checkedTags.map(checkedTag => {
        const tagObject = tags.find(tag => tag.name === checkedTag);
        return tagObject ? tagObject._id : '';
      })
      cardFilter.tags = tagIds;
    }
    if (formValues.jlpt) {
      cardFilter.jlpt = formValues.jlpt;
    }
    if (formValues.source) {
      cardFilter.source = formValues.source;
    }
    if (formValues.type === 'expression' && formValues.transitivity) {
      cardFilter.transitivity = formValues.transitivity;
    }
    if (formValues.difficulty) {
      cardFilter.difficulty = formValues.difficulty;
    }
    if (formValues.startIndex) {
      cardFilter.startIndex = formValues.startIndex;
    }
    return cardFilter;
  }
}
