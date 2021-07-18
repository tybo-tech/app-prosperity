import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services';

@Component({
  selector: 'app-dashboard-top-bar',
  templateUrl: './dashboard-top-bar.component.html',
  styleUrls: ['./dashboard-top-bar.component.scss']
})
export class DashboardTopBarComponent implements OnInit {
  showMenu: boolean;
  user: import("c:/NDU/apps/app-prosperity/src/models/user.model").User;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.user.subscribe(data=>{
      this.user = data;
    })
  }
  menu() {
    this.showMenu = !this.showMenu;
  }
}
