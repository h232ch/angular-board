import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from "../../models/Board";
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-board-comment-form',
  templateUrl: './board-comment-form.component.html',
  styleUrls: ['./board-comment-form.component.css']
})
export class BoardCommentFormComponent {



  constructor(private apiService:ApiService) {
  }

  commentForm: any;
  pub_date!: Date;
  commentId?: number;

  @Output() commentCreated = new EventEmitter<any>();
  @Output() commentUpdated = new EventEmitter<any>();
  @Output() switch = new EventEmitter<any>;
  @Input() board!: Board;
  @Input() set comment(val: any) {
    this.commentForm = new FormGroup({
      comment: new FormControl(val.comment),
      commentId: new FormControl(val.id),
    })
    this.commentId = this.commentForm.value.commentId;
  }

  saveForm() {
    if (this.commentId) {
      this.apiService.updatedComment(
        this.commentId,
        this.commentForm.value.comment,
      ).subscribe(
        (result: {}) => {
          this.commentUpdated.emit()
        }
      )
    } else {
      this.pub_date = new Date();
      this.apiService.createdComment(
        this.board.id,
        this.commentForm.value.comment,
        this.pub_date
      ).subscribe(
        (result: {}) => {
          this.commentCreated.emit(result)
        }
      )
    }
  }

  goBack() {
    this.switch.emit(false)
  }
}
