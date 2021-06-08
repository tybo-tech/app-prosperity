import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade, Subject } from 'src/models/grade.model';
import { User } from 'src/models/user.model';
import { AccountService, UserService } from 'src/services';
import { GradeService } from 'src/services/grade.service';
import { SubjectService } from 'src/services/subject.service';
import { LEARNER, TEACHER } from 'src/shared/constants';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  subjects: Subject[] = [];
  grades: Grade[] = [];
  processingPaidOrders: any[] = [];
  inTransitOrders: any[] = [];
  user: User;
  teachers: User[] = [];
  learners: User[] = [];

  constructor(
    // private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    private userService: UserService,
    private subjectService: SubjectService,
    private gradeService: GradeService,




  ) { }


  ngOnInit() {
    this.user = this.accountService.currentUserValue;


    this.userService.getUsersByCompanyId(this.user.CompanyId).subscribe(data => {
      if (data && data.length) {
        this.teachers = data.filter(x => x.UserType === TEACHER);
        this.learners = data.filter(x => x.UserType === LEARNER);
      }
    });

    this.subjectService.subjectListObservable.subscribe(data => {
      this.subjects = data;
    });
    this.subjectService.getSubjects(this.user.CompanyId);

    this.gradeService.gradeListObservable.subscribe(data => {
      this.grades = data;
    });
    this.gradeService.getGrades(this.user.CompanyId);
  }
  goto(url) {
    this.router.navigate([`admin/dashboard/${url}`]);
  }
}
