import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models';
import { Grade } from 'src/models/grade.model';
import { AccountService } from 'src/services';
import { GradeService } from 'src/services/grade.service';
import { UxService } from 'src/services/ux.service';
import { GRADES } from 'src/shared/constants';

@Component({
  selector: 'app-list-grades',
  templateUrl: './list-grades.component.html',
  styleUrls: ['./list-grades.component.scss']
})
export class ListGradesComponent implements OnInit {

  showAdd: boolean;
  showModal: boolean;
  showAddCustomer: boolean;
  showLoader: boolean;
  grades: Grade[] = [];
  systemGrades: Grade[] = [];
  modalHeading = 'Add customer';
  user;
  newGrade: Grade;
  GRADES = GRADES;
  showBulkAdd: boolean;
  constructor(
    private accountService: AccountService,
    private gradeService: GradeService,
    private router: Router,
    private uxService: UxService,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user || !this.user.Company) {
      this.router.navigate([''])
    }
    this.gradeService.gradeListObservable.subscribe(data => {
      this.grades = data;
      // this.showBulkAdd = this.grades && !this.grades.length;
      this.systemGrades = [];
      this.GRADES.forEach(item => {
        const existingGrade: Grade = this.grades.find(x => x.Name === item);
        this.systemGrades.push(
          {
            GradeId: existingGrade?.GradeId || '',
            CompanyId: existingGrade?.GradeId || this.user.CompanyId,
            Name: item,
            InstituteTypeId: 1,
            Description: existingGrade?.Description || '',
            CreateUserId: existingGrade?.CreateUserId || this.user.UserId,
            ModifyUserId: existingGrade?.ModifyUserId || this.user.UserId,
            IsSelected: !!existingGrade,
            StatusId: existingGrade?.StatusId || 1,
          }
        )
      });
    });
    this.gradeService.getGrades(this.user.CompanyId);
    this.newGrade = {
      GradeId: '',
      CompanyId: this.user.CompanyId,
      Name: '',
      InstituteTypeId: 1,
      Description: '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      IsSelected: false,
      StatusId: 1,
    }
  }
  closeModal() {
    this.showModal = false;
    this.showAddCustomer = false;
  }
  view(user: User) {
    this.router.navigate(['admin/dashboard/manage-teacher', user.UserId]);
  }
  add() {
    // this.showBulkAdd = this.grades && !this.grades.length;
    // this.showAdd = this.Grades && this.Grades.length > 0;
    // this.showBulkAdd = this.grades && this.grades.length > 0;
    this.showBulkAdd = true;
  }
  back() {
    this.router.navigate(['admin/dashboard']);
  }

  save() {
    this.gradeService.add(this.newGrade).subscribe(data => {
      if (data && data.GradeId) {
        this.gradeService.getGrades(this.user.CompanyId);
        this.showAdd = false;
        this.uxService.updateMessagePopState('Grade saved.')
      }
    })
  }
  select(Grade: Grade) {
    console.log(Grade);
    this.gradeService.add(Grade).subscribe(data => {
      if (data && data.GradeId) {
        this.gradeService.getGrades(this.user.CompanyId);
      }
    })

  }

}
