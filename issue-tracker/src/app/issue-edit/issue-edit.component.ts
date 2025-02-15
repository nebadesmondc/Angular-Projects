import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';
import { IssueForm } from '../issue-form';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit{
  @Input() issue: Issue | null = null;
  @Output() formClose = new EventEmitter();

  constructor(private fb: FormBuilder, private issueService: IssuesService) { }

  issueForm: FormGroup<IssueForm> | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    if (this.issue) {
      this.issueForm = this.fb.group<IssueForm>({
        title: new FormControl(this.issue?.title || '', {nonNullable: true, validators: Validators.required}),
        description: new FormControl(this.issue?.description || '', {nonNullable: true}),
        priority: new FormControl(this.issue?.priority ||'', {nonNullable: true, validators: Validators.required})
      });
    }
  }

  save() {
    if (this.issue){
      this.issueService.updateIssue(this.issue.issueNo, this.issueForm?.getRawValue() as Issue);
      this.formClose.emit();
    }
  }
}
