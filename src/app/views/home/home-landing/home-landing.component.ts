import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, NavigationModel, User } from 'src/models';
import { AccountService } from 'src/services';
import { ADMIN } from 'src/shared/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit {
  selectedCategory: Category;
  currentNav: string;
  categories: Category[];
  isLoading = true;
  user: User;
  shopHander: string;
  navItems: NavigationModel[] = [];
  viewIndex = 0;
  showMobileNav = false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute

  ) {

  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (this.user && this.user.UserType === ADMIN) {
      this.router.navigate(['admin/dashboard']);
    }
  


  }


  selectCategory(category: Category) {

  }


  onNavItemClicked(categoryId: string) {
    if (categoryId === 'shops') {
      this.router.navigate(['shops'])
      return
    }

    this.displayProducts(categoryId);
  }

  displayProducts(categoryId: string) {
    this.selectedCategory = this.categories.find(x => x.CategoryId === categoryId);
  }
  registerShop() { }
  navItemClicked(item: NavigationModel) {
    if (item) {
      this.viewIndex = 0;
      this.navItems.map(x => x.Class = '');
      item.Class = 'active';
      const categoryId = item.Id;
      if (categoryId === 'shops') {
        this.router.navigate(['shops'])
        return
      }
      this.selectedCategory = this.categories.find(x => x.CategoryId === categoryId);
    }
  }

  navAction(e) {
    this.viewIndex = 0;
    this.toggleMenu(false);
  }
  goto(url) {
    this.toggleMenu(false);
    if (!isNaN(url)) {
      this.viewIndex = url;
      return;
    }
    this.router.navigate([`home/${url}`]);
  }
  login() {
    this.router.navigate(['sign-in']);
  }

  toggleMenu(e) {
    this.showMobileNav = e;
  }
}
