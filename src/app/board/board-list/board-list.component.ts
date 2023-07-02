import {Component, OnInit} from '@angular/core';
import {Board} from "../../models/Board";
import {Boards} from "../../models/Boards";
import {ApiService} from "../../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent implements OnInit {

  constructor(private apiService: ApiService ) {

  }

  boards!:any;
  dataSource!:MatTableDataSource<any>;

  writeSw!: Boolean;
  writableBoard = {
    title: '',
    description: '',
  }

  length!:number;
  pageSize!:number;

  ngOnInit(): void {
    this.apiService.getBoards().subscribe(
      (result: Boards) => {
        this.boards = result;
        this.length = this.boards.count;
        this.pageSize = this.boards.results.length;
        this.dataSource = new MatTableDataSource(this.boards.results);
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
    // TODO: change to sorting function
    // this.boards.results.push(board);
    // this.writeSwitch(false);
    window.location.reload();
  }

  changePage(event: PageEvent) {
    // console.log(event)
    this.apiService.getBoardsPage(event.pageIndex+1).subscribe(
      (result: Boards) => {
        this.dataSource = new MatTableDataSource(result.results);;
        console.log(result);
      }
    )
  }
}
