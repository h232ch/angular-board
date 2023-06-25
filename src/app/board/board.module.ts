import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { BoardFormComponent } from './board-form/board-form.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        BoardComponent,
        BoardListComponent,
        BoardDetailComponent,
        BoardFormComponent
    ],
    exports: [
        BoardComponent
    ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class BoardModule { }
