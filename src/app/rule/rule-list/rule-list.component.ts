import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Rules} from "../../models/Rules";

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent implements OnInit {
  @Input() rules!:Rules;

  ngOnInit(): void {
  }

  searchData(event: Rules) {
    this.rules = event;
  }
}
