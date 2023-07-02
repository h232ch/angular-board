import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from "../../api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Board} from "../../models/Board";
import {Location} from "@angular/common";

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent {

  constructor(private apiService: ApiService,
              private location: Location) {
  }
  boardForm: any;
  id?: number;
  pubDate!:Date;

  @Output() switch = new EventEmitter<any>;
  @Output() boardCreated = new EventEmitter<any>();
  @Output() boardUpdated = new EventEmitter<any>();

  @Input() set board(val: any) {
    this.id = val.id;
    this.boardForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description),
    });
  }

  saveForm() {
    if (this.id) {
      this.apiService.updatedBoard(
        this.id,
        this.boardForm.value.title,
        this.boardForm.value.description,).subscribe(
        (result) => {
          this.boardUpdated.emit(result)
        }
      )
    } else {
      this.pubDate = new Date();
      this.apiService.createdBoard(
        this.boardForm.value.title,
        this.boardForm.value.description,
        this.pubDate).subscribe(
        (result) => {
          this.boardCreated.emit(result)
        }
      )
    }
  }

  goBack() {
    this.switch.emit(false)
  }
}

