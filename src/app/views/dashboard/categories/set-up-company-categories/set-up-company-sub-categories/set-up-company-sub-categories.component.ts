import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyVariation } from 'src/models';
import { Category } from 'src/models/category.model';
import { CompanyCategory } from 'src/models/company.category.model';
import { ModalModel } from 'src/models/modal.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CompanyCategoryService } from 'src/services/companycategory.service';

@Component({
  selector: 'app-set-up-company-sub-categories',
  templateUrl: './set-up-company-sub-categories.component.html',
  styleUrls: ['./set-up-company-sub-categories.component.scss']
})
export class SetUpCompanySubCategoriesComponent implements OnInit {
  showLoader = false;
  parentCategories: CompanyCategory[];
  selectedParentCategory: CompanyCategory;
  categories: any;
  user: User;
  showModal: boolean;

  modalModel: ModalModel = {
    heading: '',
    body: [''],
    ctaLabel: 'Add new part',
    routeTo: '/admin/dashboard/add-product',
    img: ''
  };

  currentIndex = 0;
  companyVariations: CompanyVariation[];
  constructor(
    private companyCategoryService: CompanyCategoryService,
    private router: Router,
    private accountService: AccountService,

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.companyCategoryService.parentCategoryListObservable.subscribe(data => {
      this.parentCategories = data;
      if (this.parentCategories && this.parentCategories.length) {
        this.selectedParentCategory = this.parentCategories[this.currentIndex];
        this.companyCategoryService.getSystemChildrenCategories(this.selectedParentCategory.CategoryId);
      }
    });

    this.companyCategoryService.systemChilndrenCategoryListObservable.subscribe(data => {
      if (data) {
        this.categories = data;
      }
    })
  }

  selectCategory(category: Category) {
    if (category) {
      category.IsSelected = !category.IsSelected;
      return true;
    }
  }
  save() {
    const data: CompanyCategory[] = [];
    const selectdItems = this.categories.filter(x => x.IsSelected);
    if (selectdItems && selectdItems.length) {
      selectdItems.forEach(item => {
        data.push({
          Id: 0,
          CompanyId: this.user.CompanyId,
          CategoryId: item.CategoryId,
          Name: item.Name,
          Description: item.CategoryId,
          CategoryType: item.CategoryType,
          ParentId: this.selectedParentCategory.Id,
          ImageUrl: item.ImageUrl,
          IsDeleted: false,
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          StatusId: 1
        });
      });
    }
    this.showLoader = true;
    this.companyCategoryService.addCompanyCategoriesRange(data).subscribe(res => {
      this.showLoader = false;
      if (res && res.length) {
        if (this.parentCategories && this.parentCategories.length) {
          if (this.currentIndex < this.parentCategories.length - 1) {
            this.currentIndex++;
            this.selectedParentCategory = this.parentCategories[this.currentIndex];
            this.companyCategoryService.getSystemChildrenCategories(this.selectedParentCategory.CategoryId);
            return true;
          } else {
            // this.showModal = true;
          }
        }
      }
    });

  }

  back() {
    this.router.navigate([`/admin/dashboard/set-up-company-categories`]);
  }


}