import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models';
import { Grade, Subject } from 'src/models/grade.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { AccountService, UserService } from 'src/services';
import { GradeService } from 'src/services/grade.service';
import { SubjectService } from 'src/services/subject.service';
import { UserSubjectUserSubjectGradeService } from 'src/services/user-subject.service';
import { TITLES, LEARNER, TEACHER } from 'src/shared/constants';

@Component({
  selector: 'app-list-learners',
  templateUrl: './list-learners.component.html',
  styleUrls: ['./list-learners.component.scss']
})
export class ListLearnersComponent implements OnInit {

  showAdd: boolean;
  showModal: boolean;
  showAddCustomer: boolean;
  showLoader: boolean;
  users: User[] = [];
  modalHeading = 'Add customer';
  user;
  newUser: User;
  TITLES = TITLES;
  quickViewUser: User;
  showQuickView: boolean;
  newUserSubject: UserSubjectGrade;
  subjects: Subject[] = [];
  grades: Grade[] = [];
  userSubjects: UserSubjectGrade[] = [];
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router,
    private gradeService: GradeService,
    private subjectService: SubjectService,
    private userSubjectUserSubjectGradeService: UserSubjectUserSubjectGradeService,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if(!this.user || !this.user.Company){
      this.router.navigate([''])
    }
    this.userService.userListObservable.subscribe(data => {
      this.users = data;
    });
    this.userService.getUsers(this.user.CompanyId, LEARNER);
    this.newUser = {
      UserId: '',
      CompanyId: this.user.CompanyId,
      UserType: LEARNER,
      Tittle: TITLES[0],
      Name: '',
      Surname: '',
      Email: '',
      PhoneNumber: '',
      Password: '1234',
      Dp: '',
      AddressLineHome: '',
      AddressUrlHome: '',
      AddressLineWork: '',
      AddressUrlWork: '',
      CreateUserId: 'sign-up-shop',
      ModifyUserId: 'sign-up-shop',
      StatusId: 1,
      UserToken: ''
    }

    
    this.newUserSubject = {
      Id: this.user.CompanyId,
      UserId: '',
      SubjectId: '',
      GradeId: '',
      UserType: TEACHER,
      Year: new Date().getFullYear(),
      SubjectName: '',
      GradeName: '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }

    this.subjectService.subjectListObservable.subscribe(data => {
      this.subjects = data;
    });
    this.subjectService.getSubjects(this.user.CompanyId);

    this.gradeService.gradeListObservable.subscribe(data => {
      this.grades = data;
    });
    this.gradeService.getGrades(this.user.CompanyId);
  }
  closeModal() {
    this.showModal = false;
    this.showAddCustomer = false;
  }
  edit(user: User) {
    this.router.navigate(['admin/dashboard/manage-learner', user.UserId]);
  }

  view(user: User) {
    this.quickViewUser = user;
    this.showQuickView = true;
    this.userSubjects = [];
    this.userSubjectUserSubjectGradeService.getByUserId(user.UserId).subscribe(data => {
      this.userSubjects = data;
    });
  }
  add() {
    this.showAdd = true;
  }
  back() {
    this.router.navigate(['admin/dashboard']);
  }

  save() {
    this.userService.add(this.newUser).subscribe(data => {
      if (data && data.UserId) {
        this.view(data);
      }
    })
  }

  saveNewUserSubejct() {
    this.newUserSubject.GradeName = this.grades.find(x => x.GradeId === this.newUserSubject.GradeId)?.Name || '';
    this.newUserSubject.SubjectName = this.subjects.find(x => x.SubjectId === this.newUserSubject.SubjectId)?.Name || '';
    this.newUserSubject.UserId = this.quickViewUser.UserId;
    this.userSubjectUserSubjectGradeService.add(this.newUserSubject).subscribe(data => {
      this.userSubjects.push(data);
    })
  }
}
