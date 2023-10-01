import { FetchedDataState } from '../../../models/custom-types.model';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { emptyTag, Tag } from 'src/app/study/models/tag.model';
import { TagsService } from 'src/app/study/services/tags.service';

@Component({
  selector: 'app-tags-select',
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsSelectComponent),
      multi: true
    }
  ]
})
export class TagsSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {
  public form: UntypedFormGroup;
  public tags$: Observable<Tag[]> = of([emptyTag]);
  public fetchedDataState: FetchedDataState = 'loading';
  private subscription: Subscription = new Subscription();

  onChange = (e: any) => {};
  onTouched = () => {};

  constructor(private formBuilder: UntypedFormBuilder,
              private tagsService: TagsService) {
    this.form = this.formBuilder.group({
      tags: this.formBuilder.group({})
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const tagsForm = this.form.controls['tags'] as UntypedFormGroup;
    this.tags$ = this.tagsService.tags$;
    this.subscription = this.tags$.subscribe({
      next: (res) => {
        this.fetchedDataState = res.length > 0 ? 'loaded' : 'no data'
        res.forEach(tag => {
          tagsForm.addControl(tag.name, new UntypedFormControl(false))
        })
        tagsForm.valueChanges.subscribe(res => {
          this.onTouched();
          this.onChange(res);
        })
      }, error: () => {
        this.fetchedDataState = 'no data';
      }
    })
    
  }

  writeValue(obj: any): void {
    const tagsForm = this.form.controls['tags'] as UntypedFormGroup;
    Object.keys(obj).forEach(key => {
      if (tagsForm.controls.hasOwnProperty(key)) {
        tagsForm.controls[key].setValue(true);
      }
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
