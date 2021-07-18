import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { AccountService } from 'src/services';
import { UserSubjectUserSubjectGradeService } from 'src/services/user-subject.service';

@Component({
  selector: 'app-learner-portal',
  templateUrl: './learner-portal.component.html',
  styleUrls: ['./learner-portal.component.scss']
})
export class LearnerPortalComponent implements OnInit {

  userSubjects: UserSubjectGrade[] = [];
  user: User;

  constructor(
    private userSubjectUserSubjectGradeService: UserSubjectUserSubjectGradeService,
    private accountService: AccountService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;

    this.userSubjectUserSubjectGradeService.getByUserId(this.user.UserId).subscribe(data => {
      this.userSubjects = data;
    });
  }
  goToFeed(id) {
    this.router.navigate([`admin/dashboard/subject-feed`, id]);
  }

}
