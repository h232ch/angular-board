import {Component, OnInit} from '@angular/core';
import {Board} from "../../models/Board";
import {ApiService} from "../../api.service";


@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  constructor(private apiService: ApiService ) {
  }

  boards?: Board[]
  writeSw?: Boolean;
  writableBoard = {
    title: '',
    description: '',
  }

  ngOnInit(): void {
    this.apiService.getBoards().subscribe(
      (result: Board[]) => {
        this.boards = result;
        // console.log(result);
      },
      error => {
        console.log(error)
      }
    );
    this.writeSw = false;
  }

  writeSwitch(val: boolean) {
    this.writeSw = val;
  }

  boardCreated(board: Board) {
    this.boards?.push(board);
    this.writeSwitch(false);
  }
}
