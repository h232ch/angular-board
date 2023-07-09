import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
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

  boards!:any;
  dataSource!:MatTableDataSource<any>;

  writeSw!: Boolean;
  writableBoard = {
    title: '',
    description: '',
  }
  searchData = '';
  page!:number;

  pageSize!:number;
  length!:number;
  pageIndex!:number;

  ngOnInit(): void {

    // this.route.queryParams.subscribe(data => {
    //   this.searchData = data['search']
    //   this.page = data['page']
    //
    //   if (this.page == undefined) {
    //     this.page = 1;
    //   }
    // })

    // this.apiService.getBoards(this.page, this.searchData).subscribe(

    this.pageIndex = this.apiService.pageIndexGet()
    this.apiService.getBoards(this.pageIndex + 1).subscribe(
      (result: Boards) => {
        this.boards = result;
        this.dataSource = new MatTableDataSource(this.boards.results);
        this.pageSize = this.boards.results.length;
        this.length = this.boards.count;

        console.log(this.pageIndex)
        console.log(result)
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
    window.location.reload();
  }

  // changePage(event: PageEvent) {
  //   // if (event == true) {
  //   //   this.page++;
  //   //   this.apiService.getBoards(this.page, this.searchData).subscribe(
  //   //     (result: Boards) => {
  //   //       this.dataSource = new MatTableDataSource(result.results);});
  //   // } else {
  //   //   this.page--;
  //   //   this.apiService.getBoards(this.page, this.searchData).subscribe(
  //   //     (result: Boards) => {
  //   //       this.dataSource = new MatTableDataSource(result.results);});
  //   // }
  //   // this.router.navigate(["/board"],
  //   //   {queryParams: {search: this.searchData, page: this.page}});
  //
  //
  // }

  changePage(event: PageEvent) {
    // console.log(event)
    this.apiService.getBoardsPage(event.pageIndex+1).subscribe(
      (result: Boards) => {
        this.dataSource = new MatTableDataSource(result.results);
        // console.log(result);
      }
    )
    this.apiService.pageIndexSet(event.pageIndex);
  }

  searchBoards(event: MatTableDataSource<Boards>) {
    this.boards = event;
    this.dataSource = new MatTableDataSource(this.boards.results);
    this.pageSize = this.boards.results.length;
    this.length = this.boards.count;
    this.paginator.pageIndex = 0;
    this.apiService.pageIndexSet(0)
  }

  searchDataUpdate(event: string) {
    this.searchData = event;
  }

}
