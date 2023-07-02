import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCommentFormComponent } from './board-comment-form.component';

describe('BoardCommentFormComponent', () => {
  let component: BoardCommentFormComponent;
  let fixture: ComponentFixture<BoardCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCommentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
