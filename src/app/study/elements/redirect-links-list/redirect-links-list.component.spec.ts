import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectLinksListComponent } from './redirect-links-list.component';

describe('RedirectLinksListComponent', () => {
  let component: RedirectLinksListComponent;
  let fixture: ComponentFixture<RedirectLinksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectLinksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectLinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
