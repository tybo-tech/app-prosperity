import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models';
import { Subject } from 'src/models/grade.model';
import { AccountService, UserService } from 'src/services';
import { SubjectService } from 'src/services/subject.service';
import { UxService } from 'src/services/ux.service';
import { SUBJECTS, TEACHER } from 'src/shared/constants';

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.scss']
})
export class ListSubjectsComponent implements OnInit {
  showAdd: boolean;
  showModal: boolean;
  showAddCustomer: boolean;
  showLoader: boolean;
  subjects: Subject[] = [];
  systemSubjects: Subject[] = [];
  modalHeading = 'Add customer';
  user;
  newSubject: Subject;
  SUBJECTS = SUBJECTS;
  showBulkAdd: boolean;
  constructor(
    private accountService: AccountService,
    private subjectService: SubjectService,
    private router: Router,
    private uxService: UxService,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user || !this.user.Company) {
      this.router.navigate([''])
    }
    this.subjectService.subjectListObservable.subscribe(data => {
      this.subjects = data;
      // this.showBulkAdd = this.subjects && !this.subjects.length;
      this.systemSubjects = [];
      this.SUBJECTS.forEach(item => {
        const existingSubject: Subject = this.subjects.find(x => x.Name === item);
        this.systemSubjects.push(
          {
            SubjectId: existingSubject?.SubjectId || '',
            CompanyId: existingSubject?.SubjectId || this.user.CompanyId,
            Name: item,
            PassMark: existingSubject?.PassMark || '40',
            Description: existingSubject?.Description || '',
            ImageUrl: existingSubject?.ImageUrl || '',
            Code: existingSubject?.Code || '',
            CreateUserId: existingSubject?.CreateUserId || this.user.UserId,
            ModifyUserId: existingSubject?.ModifyUserId || this.user.UserId,
            IsSelected: !!existingSubject,
            StatusId: existingSubject?.StatusId || 1,
          }
        )
      });
    });
    this.subjectService.getSubjects(this.user.CompanyId);
    this.newSubject = {
      SubjectId: '',
      CompanyId: this.user.CompanyId,
      Name: '',
      PassMark: '40',
      Description: '',
      ImageUrl: '',
      Code: '',
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
    this.showBulkAdd = true;
    // this.showBulkAdd = this.subjects && !this.subjects.length;
    // this.showAdd = this.subjects && this.subjects.length > 0;
    // this.showBulkAdd = this.subjects && this.subjects.length > 0;
  }
  back() {
    this.router.navigate(['admin/dashboard']);
  }

  save() {
    this.subjectService.add(this.newSubject).subscribe(data => {
      if (data && data.SubjectId) {
        this.subjectService.getSubjects(this.user.CompanyId);
        this.showAdd = false;
        this.uxService.updateMessagePopState('Subject saved.')
      }
    })
  }
  select(subject: Subject) {
    console.log(subject);
    this.subjectService.add(subject).subscribe(data => {
      if (data && data.SubjectId) {
        this.subjectService.getSubjects(this.user.CompanyId);
      }
    })

  }
}
