import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMyProfileComponent } from 'src/app/account/edit-my-profile/edit-my-profile.component';
import { ForgotPasswordComponent, ResetPasswordComponent } from 'src/app/account/forgot-password';
import { MyProfileComponent } from 'src/app/account/my-profile/my-profile.component';
import { SignInComponent } from 'src/app/account/sign-in';
import { SocialLoginComponent } from 'src/app/account/sign-in/social-login/social-login.component';
import { SignUpComponent } from 'src/app/account/sign-up';
import { SignUpModalComponent } from 'src/app/account/sign-up-modal/sign-up-modal.component';

import { SearchCompanyPipe } from 'src/app/_pipes/search-company.pipe';
import { SearchProductHomePipe } from 'src/app/_pipes/search-product-home.pipe';
import { TextarealinebreakpipePipe } from 'src/app/_pipes/textarealinebreakpipe.pipe';
import { ChatComponent } from './chat/chat.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { HomeLandingComponent } from './home-landing';
import { HelloPageComponent } from './home-landing/hello-page/hello-page.component';
import { HowItWorksComponent } from './home-landing/sell-with-us/how-it-works/how-it-works.component';
import { SellWithUsComponent } from './home-landing/sell-with-us/sell-with-us.component';
import { HomeLoaderComponent } from './home-loader/home-loader.component';
import { HomeNavComponent } from './home-nav';
import { HomeToolbarNavigationComponent } from './home-toolbar-navigation/home-toolbar-navigation.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'home/sign-in', component: SignInComponent },
      { path: 'home/start-shop', component: SignUpModalComponent },
      { path: 'home/sign-up', component: SignUpComponent },
      { path: 'home/forgot-password', component: ForgotPasswordComponent },
      { path: 'home/reset-password', component: ResetPasswordComponent },
      { path: 'home/hello-fashion-shop', component: SellWithUsComponent },
      { path: 'home/contact-us', component: ContactComponent },
      { path: 'home/profile', component: MyProfileComponent },
      { path: 'home/chat/:id/:userId/:userToId', component: ChatComponent },
      { path: 'home/messages/:traceId/:targetId', component: MessagesComponent }

    ]
  }
];

export const declarations = [
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  HomeComponent,
  HomeLandingComponent,
  HomeNavComponent,
  HomeToolbarNavigationComponent,
  SellWithUsComponent,
  SignUpModalComponent,
  HowItWorksComponent,
  CustomerFeedbackComponent,
  HomeLoaderComponent,
  MyProfileComponent,
  EditMyProfileComponent,
  HelloPageComponent,
  ChatComponent,
  MessagesComponent,
  SocialLoginComponent,
  ContactComponent,
  TextarealinebreakpipePipe,
  SearchCompanyPipe,
  SearchProductHomePipe
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
