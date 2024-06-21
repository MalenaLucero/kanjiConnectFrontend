import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiGroupsComponent } from './kanji-groups.component';

describe('KanjiGroupsComponent', () => {
  let component: KanjiGroupsComponent;
  let fixture: ComponentFixture<KanjiGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanjiGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanjiGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
