import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models';
import { AccountService } from 'src/services';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  user: User;
  constructor(
    private accountService: AccountService,
    private router: Router,

  ) { }


  ngOnInit() {
    this.user = this.accountService.currentUserValue;

  }
  goto(url) {
    this.router.navigate([`admin/dashboard/${url}`]);
  }

}
