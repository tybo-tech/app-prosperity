import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/shared_components/loader/loader.component';
import { ImagesComponent } from 'src/shared/components/images/images.component';
import { SetUpCompanyCategoriesComponent } from './categories/set-up-company-categories/set-up-company-categories.component';
import { SetUpCompanySubCategoriesComponent } from './categories/set-up-company-categories/set-up-company-sub-categories/set-up-company-sub-categories.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { DashNavComponent } from './navigations/dash-nav/dash-nav.component';
import { SuperCategoriesComponent } from './super/category/super-categories/super-categories.component';
import { SuperCategoryComponent } from './super/category/super-category/super-category.component';
import { SuperAddAditCategoryComponent } from './super/category/super-add-adit-category/super-add-adit-category.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { SuperCompaniesComponent } from './super/super-companies/super-companies.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { SearchProductPipe } from 'src/app/_pipes/search-product.pipe';
import { SuperOverviewComponent } from './overview/super-overview/super-overview.component';
import { CompanyProfileLogoComponent } from './company/company-profile/company-profile-logo/company-profile-logo.component';
import { SuperCompanyPageComponent } from './super/super-companies/super-company-page/super-company-page.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { Overviewv2Component } from './overview/overviewv2/overviewv2.component';
import { StatisticsComponent } from './overview/overviewv2/statistics/statistics.component';
import { MenuItemsComponent } from './overview/overviewv2/statistics/menu-items/menu-items.component';
import { ListTeachersComponent } from './users/teachers/list-teachers/list-teachers.component';
import { ManageTeacherComponent } from './users/teachers/manage-teacher/manage-teacher.component';
import { ManageLearnerComponent } from './users/students/manage-learner/manage-learner.component';
import { ListLearnersComponent } from './users/students/list-learners/list-learners.component';
import { ListSubjectsComponent } from './subjects/list-subjects/list-subjects.component';
import { ManageSubjectComponent } from './subjects/manage-subject/manage-subject.component';
import { ListGradesComponent } from './grades/list-grades/list-grades.component';
import { ManageGradeComponent } from './grades/manage-grade/manage-grade.component';
import { TeacherPortalComponent } from './dashboard/teacher-portal/teacher-portal.component';
import { LearnerPortalComponent } from './dashboard/learner-portal/learner-portal.component';
import { SubjectFeedComponent } from './subjects/subject-feed/subject-feed.component';
import { VoiceRecoderComponent } from './subjects/voice-recoder/voice-recoder.component';
import { ManageSubjectFeedComponent } from './subjects/subject-feed/manage-subject-feed/manage-subject-feed.component';
import { DashboardTopBarComponent } from './navigations/dashboard-top-bar/dashboard-top-bar.component';
import { SliderWidgetComponent } from './shared/slider-widget/slider-widget.component';
import { CardWidgetComponent } from './shared/card-widget/card-widget.component';
import { CardListWidgetComponent } from './shared/card-list-widget/card-list-widget.component';
import { SubjectLessonsComponent } from './subjects/subject-lessons/subject-lessons.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: Overviewv2Component },
      { path: 'set-up-company-categories', component: SetUpCompanyCategoriesComponent },
      { path: 'set-up-company-sub-categories', component: SetUpCompanySubCategoriesComponent },
      { path: 'super-categories', component: SuperCategoriesComponent },
      { path: 'super-category/:id', component: SuperCategoryComponent },
      { path: 'super-companies', component: SuperCompaniesComponent },
      { path: 'super-company-page/:id', component: SuperCompanyPageComponent },
      { path: 'company-profile', component: CompanyProfileComponent },
      { path: 'upload-company-logo', component: CompanyProfileLogoComponent },
      { path: 'all-users', component: AllUsersComponent },
     { path: 'list-teachers', component: ListTeachersComponent },
      { path: 'manage-teacher/:id', component: ManageTeacherComponent },
      { path: 'list-learners', component: ListLearnersComponent },
      { path: 'manage-learner/:id', component: ManageLearnerComponent },
      { path: 'list-subjects', component: ListSubjectsComponent },
      { path: 'manage-subject/:id', component: ManageSubjectComponent },
      { path: 'list-grades', component: ListGradesComponent },
      { path: 'manage-grade/:id', component: ManageGradeComponent },
      { path: 'teacher-portal', component: TeacherPortalComponent },
      { path: 'learner-portal', component: LearnerPortalComponent },
      { path: 'subject-feed/:id', component: SubjectFeedComponent },
      { path: 'manage-subject-feed/:id', component: ManageSubjectFeedComponent },
      { path: 'subject-lessons/:id', component: SubjectLessonsComponent },
    ]
  }
];
export const declarations: Array<any> = [
  DashboardComponent,
  LoaderComponent,
  ImagesComponent,
  DashNavComponent,
  SetUpCompanyCategoriesComponent,
  SetUpCompanySubCategoriesComponent,
  UserFeedbackComponent,
  SuperCategoriesComponent,
  SuperCategoryComponent,
  SuperAddAditCategoryComponent,
  SuperCompaniesComponent,
  CompanyProfileComponent,
  UserFeedbackComponent,
  SuperOverviewComponent,
  ImagesComponent,
  CompanyProfileLogoComponent,
  SuperCompanyPageComponent,
  AllUsersComponent,
  ListTeachersComponent,
  ManageTeacherComponent,
  ListSubjectsComponent,
  ManageSubjectComponent,
  ManageGradeComponent,
  ListGradesComponent,
  TeacherPortalComponent,
  LearnerPortalComponent,
  SubjectFeedComponent,
  VoiceRecoderComponent,
  ManageSubjectFeedComponent,
  // pipes
  SearchProductPipe,
  Overviewv2Component,
  StatisticsComponent,
  MenuItemsComponent,
  ManageLearnerComponent,
  ListLearnersComponent,
  DashboardTopBarComponent,
  SliderWidgetComponent,
  CardWidgetComponent,
  CardListWidgetComponent,
  SubjectLessonsComponent

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

