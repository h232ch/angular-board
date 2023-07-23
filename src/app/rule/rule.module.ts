import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleListComponent } from './rule-list/rule-list.component';
import {MatTableModule} from "@angular/material/table";
import { RuleFormSearchComponent } from './rule-form-search/rule-form-search.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RuleListComponent,
    RuleFormSearchComponent
  ],
  exports: [
    RuleListComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        ReactiveFormsModule
    ]
})
export class RuleModule { }
