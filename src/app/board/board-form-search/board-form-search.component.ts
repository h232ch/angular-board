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

  constructor(private apiService:ApiService,) {
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
  }
}
