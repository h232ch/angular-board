import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { BoardFormComponent } from './board-form/board-form.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatInputModule} from "@angular/material/input";
import { BoardCommentFormComponent } from './board-comment-form/board-comment-form.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BoardFormSearchComponent } from './board-form-search/board-form-search.component';


@NgModule({
    declarations: [
        BoardComponent,
        BoardListComponent,
        BoardDetailComponent,
        BoardFormComponent,
        BoardCommentFormComponent,
        BoardFormSearchComponent,
    ],
  exports: [
    BoardComponent,
    MatIconModule,
    BoardFormSearchComponent,
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
        BrowserAnimationsModule,
        FormsModule,
    ]
})
export class BoardModule { }
