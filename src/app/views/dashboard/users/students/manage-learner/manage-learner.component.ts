import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { User, Email } from 'src/models';
import { ModalModel } from 'src/models/modal.model';
import { UploadService, UserService, AccountService, EmailService } from 'src/services';
import { UxService } from 'src/services/ux.service';
import { TITLES } from 'src/shared/constants';

@Component({
  selector: 'app-manage-learner',
  templateUrl: './manage-learner.component.html',
  styleUrls: ['./manage-learner.component.scss']
})
export class ManageLearnerComponent implements OnInit {


  user: User;
  modalModel: ModalModel = {
    heading: undefined,
    body: [],
    ctaLabel: 'Go back to learners',
    routeTo: 'admin/dashboard/list-learners',
    img: undefined
  };


  showLoader;

  emailToSend: Email;
  users: User[];
  showGotoCustomer: boolean;
  existingUser: User;
  heading: string;
  userId: string;
  accountUser: User;
  TITLES = TITLES;
  constructor(
    private uploadService: UploadService,
    private userService: UserService,
    private accountService: AccountService,
    private uxService: UxService,
    private router: Router,
    private emailService: EmailService,
    private activatedRoute: ActivatedRoute,

  ) {

    this.activatedRoute.params.subscribe(r => {
      this.userId = r.id;
      if (this.userId) {
        this.user = this.userService.currentUserValue;
        this.heading = `${this.user.Name} ${this.user.Surname}`;
        this.userService.getUser(this.userId);
        this.userService.userObservable.subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  ngOnInit() {
    this.accountUser = this.accountService.currentUserValue;
    this.userService.userListObservable.subscribe(data => {
      this.users = data;
    });



  }

  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      this.uploadService.resizeImage(file, null, this.user);

      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      // this.uploadService.uploadFile(formData).subscribe(url => {
      //   this.customer.Dp = `${environment.API_URL}/api/upload/${url}`;
      // });

    });
  }

  save() {


    if (this.user.UserId && this.user.UserId.length > 5) {
      if (!this.user.CompanyId) {
        this.user.CompanyId = this.accountUser.CompanyId;
      }
      this.userService.updateUserSync(this.user).subscribe(data => {
        if (data && data.UserId) {
        }
      })
    }
    else {
      if (this.checkIfCustomerExist()) {
        this.uxService.updateMessagePopState('Customer already exist.');
        this.showGotoCustomer = true;
        return false
      }
      this.userService.add(this.user).subscribe(data => {
        if (data && data.UserId) {
          // this.sendEmail(data, 'Add-New-Customer');
        }
      });
    }
  }

  sendEmail(user: User, type: string) {
    this.emailService.getCustomerEmails().subscribe(emailData => {
      this.emailToSend = emailData.find(x => x.Type === type)
      this.emailToSend.UserFullName = user.Name;
      this.emailToSend.Email = user.Email;
      this.emailService.sendGeneralTextEmail(this.emailToSend).subscribe(data => {
        if (data > 0) {
        } else {
          alert('Something went wrong');
        }
      })

    });
  }



  getCustomerEmailType(type: string) {
    this.emailToSend = null;
    return this.emailToSend;
  }

  checkIfCustomerExist() {
    const customer = this.users && this.users.find(x => x.Email && x.Email.length > 4 && x.Email.includes('@') && x.Email === this.user.Email);
    if (customer) {
      this.existingUser = customer;
    }
    return customer;
  }



  back() {
    this.router.navigate([`admin/dashboard/list-learners`]);
  }

}
