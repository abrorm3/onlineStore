import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertItemDialogComponent } from './insert-item-dialog.component';

describe('InsertItemDialogComponent', () => {
  let component: InsertItemDialogComponent;
  let fixture: ComponentFixture<InsertItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
