import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaHistoryComponent } from './ca-history.component';

describe('CaHistoryComponent', () => {
  let component: CaHistoryComponent;
  let fixture: ComponentFixture<CaHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
