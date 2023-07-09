import {Component, EventEmitter, Output} from '@angular/core';
import {ApiService} from "../../api.service";
import {Boards} from "../../models/Boards";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-form-search',
  templateUrl: './board-form-search.component.html',
  styleUrls: ['./board-form-search.component.css']
})
export class BoardFormSearchComponent {

  @Output() dataSource = new EventEmitter<any>();
  @Output() searchData = new EventEmitter<any>();
  search = '';
  constructor(private apiService:ApiService,
              private router: Router) {
  }


  searchForm = new FormGroup({
    search: new FormControl(null),
  })

  saveForm() {
    if (this.searchForm.value) {
      this.apiService.getBoards(1, this.searchForm.value.search).subscribe(
        (results: Boards) => {
          this.dataSource.emit(results)
          this.searchData.emit(this.searchForm.value.search)
        }
      );
    } else {
      console.log('failed')
    }

    // if (this.searchForm.value) {
    //   this.router.navigate(["/board"],
    //     {queryParams: {search: this.searchForm.value.search, page: 1}}).then(() =>
    //   window.location.reload())
    // } else {
    //   console.log('failed')
    // }
  }
}
