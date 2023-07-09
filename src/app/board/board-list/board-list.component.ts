import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Board} from "../../models/Board";
import {Boards} from "../../models/Boards";
import {ApiService} from "../../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";


@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent implements OnInit {

  constructor(private apiService: ApiService,
              // private route: ActivatedRoute,
              // private router: Router
  ) {
  }

  // paginator pageIndex 값을 조작하기 위해 @ViewChild를 사용해야 함
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  boards!: any;
  dataSource!: MatTableDataSource<any>;

  writeSw!: Boolean;
  writableBoard = {
    title: '',
    description: '',
  }
  searchData = '';
  length!: number;
  pageIndex!: number;

  ngOnInit(): void {
    this.pageIndex = this.apiService.pageIndexGet()
    this.apiService.getBoards(this.pageIndex + 1, this.searchData).subscribe(
      (result: Boards) => {
        this.boards = result;
        this.dataSource = new MatTableDataSource(this.boards.results);
        this.length = this.boards.count;
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
    this.apiService.pageIndexSet(0);
    window.location.reload();
  }

  changePage(event: PageEvent) {
    this.apiService.getBoards(event.pageIndex + 1, this.searchData).subscribe(
      (result: Boards) => {
        this.dataSource = new MatTableDataSource(result.results);
      }
    )
    this.apiService.pageIndexSet(event.pageIndex);
  }

  searchBoards(event: MatTableDataSource<Boards>) {
    this.boards = event;
    this.dataSource = new MatTableDataSource(this.boards.results);
    this.length = this.boards.count;
    this.paginator.pageIndex = 0;
    this.apiService.pageIndexSet(0)
  }

  searchDataUpdate(event: string) {
    this.searchData = event;
  }

}
