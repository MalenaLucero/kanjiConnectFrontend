import { Component, forwardRef, Input, OnInit, SimpleChange } from '@angular/core';
import { ControlValueAccessor, UntypedFormBuilder, UntypedFormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Difficulty } from 'src/app/shared/models/custom-types.model';
import { SelectValuesService } from 'src/app/study/services/select-values.service';

@Component({
  selector: 'app-difficulty-select',
  templateUrl: './difficulty-select.component.html',
  styleUrls: ['./difficulty-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DifficultySelectComponent),
    multi: true
  }]
})
export class DifficultySelectComponent implements OnInit, ControlValueAccessor {
  public form: UntypedFormGroup;
  public difficultyValues: any;
  @Input() set hideEmptyOption(value: boolean) {
    if (value) {
      this.difficultyValues.shift();
    }
  }

  onChange = (e: any) => {}
  onTouched = () => {}

  constructor(private formBuilder: UntypedFormBuilder,
              private selectValuesService: SelectValuesService) {
    this.difficultyValues = this.selectValuesService.getDifficulty();
    this.form = this.formBuilder.group({
      difficulty: [null],
    })
  }

  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    this.onTouched()
    this.onChange(event.value);
  }

  writeValue(currentDifficulty: Difficulty): void {
    if (currentDifficulty !== null) {
      const nameAndValue = this.difficultyValues.find((e: any) => e.value !== null && e.value.includes(currentDifficulty));
      this.form.get('difficulty')?.setValue(nameAndValue.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
