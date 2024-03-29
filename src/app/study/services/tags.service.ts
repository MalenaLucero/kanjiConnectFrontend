import { FormTag } from './../models/tag.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag, UploadTag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { SortingService } from './sorting.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private user: string;
  private tags = new BehaviorSubject<Tag[]>([]);
  tags$ = this.tags.asObservable();

  constructor(private http: HttpClient,
              private sortingService: SortingService,
              private authService: AuthService) {
                this.user = this.authService.getUserId();
              }

  getTagsByUser(user: string) {
    return this.http.get<Tag[]>(environment.tags + '/user/' + user);
  }

  getTags() {
    this.http.get<Tag[]>(environment.tags + '/user/' + this.user).subscribe(
      res => {
        const sortedTags = this.sortingService.sortTagsByColor(res);
        this.tags.next(sortedTags);
      }
    )
  }

  getTagIds(tagNames: string[]) {
    return new Promise(resolve => {
      this.tags$.pipe(take(1)).subscribe(
        res => {
          const tagIds = res.filter(tag => tagNames.includes(tag.name)).map(tag => tag._id);
          resolve(tagIds)
        }
      )
    })
  }

  getTagIdsFromNames(tagNames: string[]): string[] {
    let tagIds: string[] = [];
    this.tags$.pipe(take(1)).subscribe(
      res => tagIds = res.filter(tag => tagNames.includes(tag.name)).map(tag => tag._id)
    )
    return tagIds;
  }

  getTagsFromTagNames(tagNames: string[]): Tag[] {
    let tags: Tag[] = [];
    this.tags$.pipe(take(1)).subscribe(
      res => tags = res.filter(tag => tagNames.includes(tag.name))
    )
    return tags;
  }

  getTagsFromTagIds(tagIds: string[]): Tag[] {
    let tags: Tag[] = [];
    this.tags$.pipe(take(1)).subscribe(
      res => tags = res.filter(tag => tagIds.includes(tag._id))
    )
    return tags;
  }

  uploadTag(data: UploadTag) {
    return this.http.post(environment.tagsPrivate, data);
  }

  deleteTag(id: string) {
    return this.http.delete<Tag>(environment.tagsPrivate + '/' + id);
  }

  updateTag(id: string, data: FormTag) {
    return this.http.put<Tag>(environment.tagsPrivate + '/' + id, data);
  }

  getAllPossibleTagCombinations(arr: string[]): string[][] {
    if (arr.length === 1) return [arr];
    else {
      const subarr = this.getAllPossibleTagCombinations(arr.slice(1));
      return subarr.concat(subarr.map(e => e.concat(arr[0])), [[arr[0]]]);
    }
  }

  filterTagsById(tagIds: string[]): Tag[] {
    let tags: Tag[] = [];
    this.tags$.pipe(take(1)).subscribe(
      res => tags = res.filter(tag => tagIds.includes(tag._id))
    )
    return tags;
  }
}
