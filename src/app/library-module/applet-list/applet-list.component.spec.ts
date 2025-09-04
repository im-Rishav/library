import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppletListComponent } from './applet-list.component';

describe('AppletListComponent', () => {
  let component: AppletListComponent;
  let fixture: ComponentFixture<AppletListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppletListComponent]
    });
    fixture = TestBed.createComponent(AppletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
