import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Rules} from "../models/Rules";

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  rules!:Rules;
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getRules().subscribe(
      (result: Rules) => {
        this.rules = result;
        console.log(this.rules)
      }
    )
  }
}
