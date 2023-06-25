import {Input, NgModule} from '@angular/core';
import {ActivatedRoute, RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {BoardComponent} from "./board/board.component";
import {MainComponent} from "./main/main.component";
import {BoardDetailComponent} from "./board/board-detail/board-detail.component";
import {BoardFormComponent} from "./board/board-form/board-form.component";
import {Board} from "./models/Board";
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "./api.service";
import {Location} from "@angular/common";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'board', component: BoardComponent},
  {path: 'board/edit/:id', component: BoardFormComponent},
  {path: 'board/write', component: BoardFormComponent},
  {path: 'board/:id', component: BoardDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  board?: Board
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.apiService.getBoard(id)
      .subscribe(board => this.board = board)
  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location) {
  }


}
