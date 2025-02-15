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

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = issues.findIndex(i => i === issue);
    issues[index] = selectedIssue;
  }

  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return issues.filter(issue => issue.title.indexOf(title) !== -1);
    }
    return [];
  }

  updateIssue(issueNo: number, issue:Issue) {
    const existingIssue = issues.find(i => i.issueNo === issueNo);
    if (existingIssue) {
      const index = issues.indexOf(existingIssue);
      issues[index] = {
        ...existingIssue,
        ...issue
      }
    }

  }
}
