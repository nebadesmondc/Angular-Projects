import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';
import { IssueForm } from '../issue-form';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {
  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {nonNullable: true, validators: Validators.required}),
    description: new FormControl('', {nonNullable: true}),
    priority: new FormControl('', {nonNullable: true, validators: Validators.required}),
    type: new FormControl('', {nonNullable: true, validators:Validators.required}),
  })

  constructor(private issueService: IssuesService) {};
  suggestions: Issue[] = [];

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe(title => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
  }
  
  @Output() formClose = new EventEmitter();

  addIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue)
    this.formClose.emit();
  }

  
}
