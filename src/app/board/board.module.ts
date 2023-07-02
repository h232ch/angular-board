import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { BoardFormComponent } from './board-form/board-form.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatInputModule} from "@angular/material/input";
import { BoardCommentFormComponent } from './board-comment-form/board-comment-form.component';



@NgModule({
    declarations: [
        BoardComponent,
        BoardListComponent,
        BoardDetailComponent,
        BoardFormComponent,
        BoardCommentFormComponent,
    ],
    exports: [
        BoardComponent,
        MatIconModule,
    ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
  ]
})
export class BoardModule { }
