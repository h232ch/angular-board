import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Rules} from "../../models/Rules";

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent implements OnInit {
  // @Input() rules!:Rules| undefined;
  rules?:Rules| undefined;
  emptyMsg:boolean = true
  errorMsg?:string | undefined;
  firMsg:boolean = true;

  ngOnInit(): void {

  }

  searchData(event: Rules) {
    this.rules = event;
    if (this.rules.result.length > 0) {
      this.emptyMsg = true;
      this.errorMsg = undefined;
      this.firMsg = false;
    } else {
      this.emptyMsg = false;
      this.errorMsg = undefined;
      this.firMsg = false;
    }
  }

  errorMessage(event: string): void {
    this.errorMsg = event;
    this.rules = undefined;
    this.emptyMsg = true;
    this.firMsg = true;
  }
}
