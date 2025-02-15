import { Injectable } from '@angular/core';
import { issues } from '../assets/mock-issues'
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  // issues: Issue[] = []

  constructor() { }

  getPendingIssues(): Issue[] {
    return issues.filter(issue => !issue.completed);
  }

  createIssue(issue: Issue) {
    issue.issueNo = issues.length + 1;
    issues.push(issue);
  }
}
