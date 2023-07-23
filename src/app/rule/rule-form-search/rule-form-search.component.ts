import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../api.service";
import {Rules} from "../../models/Rules";

@Component({
  selector: 'app-rule-form-search',
  templateUrl: './rule-form-search.component.html',
  styleUrls: ['./rule-form-search.component.css']
})
export class RuleFormSearchComponent {
  @Output() rules = new EventEmitter<Rules>();
  constructor(private apiService:ApiService) {
  }

  searchForm = new FormGroup(
    {
      src: new FormControl(null),
      dst: new FormControl(null),
      port: new FormControl(null),
    }
  )

  saveForm() {
    if (this.searchForm.value) {
      const formData:any = this.searchForm.value;
      formData.src = formData.src || '';
      formData.dst = formData.dst || '';
      formData.port = formData.port || '';

      this.apiService.getRules(formData.src,
        formData.dst, formData.port).
      subscribe(
        (result: Rules) => {
          this.rules.emit(result)
        }
      )
    }
  }
}
