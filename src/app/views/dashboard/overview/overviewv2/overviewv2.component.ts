import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { SliderWidgetModel } from 'src/models/UxModel.model';
import { AccountService, CompanyCategoryService } from 'src/services';
import { UserSubjectUserSubjectGradeService } from 'src/services/user-subject.service';
import { UxService } from 'src/services/ux.service';
import { ADMIN, LEARNER, SUPER, TEACHER } from 'src/shared/constants';

@Component({
  selector: 'app-overviewv2',
  templateUrl: './overviewv2.component.html',
  styleUrls: ['./overviewv2.component.scss']
})
export class Overviewv2Component implements OnInit {
  user: User;
  showAdd: boolean;
  companyLink = '';
  ADMIN = ADMIN;
  SUPER = SUPER;
  TEACHER = TEACHER;
  LEARNER = LEARNER;
  showMenu: boolean;
  userSubjects: UserSubjectGrade[] = [];
  subjects: SliderWidgetModel[];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private uxService: UxService,
    private userSubjectUserSubjectGradeService: UserSubjectUserSubjectGradeService,

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user || !this.user.Company) {
      this.router.navigate(['home/sign-in'])
    }
    this.companyLink = `${environment.BASE_URL}/${this.user.Company.Slug || this.user.Company.CompanyId}`
    this.userSubjectUserSubjectGradeService.getByUserId(this.user.UserId).subscribe(data => {
      this.userSubjects = data;
      if (this.userSubjects && this.userSubjects.length) {
        this.subjects = [];
        this.userSubjects.forEach(item => {
          this.subjects.push({
            Name: item.SubjectName,
            Description: item.GradeName,
            Link: `admin/dashboard/subject-feed/${item.Id}`
          })
        })
      }
    });

  }

  goto(url) {
    this.router.navigate([`admin/dashboard/${url}`]);
  }


  gotoShop() {
    this.router.navigate([this.user.Company.Slug || this.user.Company.CompanyId]);
  }

  copy() {

    let nav: any;
    nav = window.navigator;
    if (nav.share) {
      nav.share({
        title: 'Hello!',
        text: 'Check out our shop.',
        url: this.companyLink,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      this.uxService.updateMessagePopState('Shop LinkCopied to clipboard.');
    }
  }

  menu() {
    this.showMenu = !this.showMenu;
  }
}
