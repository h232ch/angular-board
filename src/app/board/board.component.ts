import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Board} from "../models/Board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boards?: Board[]
  ngOnInit(): void {
    this.apiService.getBoards().subscribe(
      (result: Board[]) => {
        this.boards = result;
        // console.log(result);
      },
      error => {
        console.log(error)
      }
    )
  }

  constructor(private apiService: ApiService) { }

}
