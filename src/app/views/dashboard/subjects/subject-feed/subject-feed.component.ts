import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models';
import { TopicContent } from 'src/models/topiccontent.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { SliderWidgetModel } from 'src/models/UxModel.model';
import { AccountService } from 'src/services/account.service';
import { TopicContentService } from 'src/services/topiccontent.service';
import { UserSubjectUserSubjectGradeService } from 'src/services/user-subject.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-subject-feed',
  templateUrl: './subject-feed.component.html',
  styleUrls: ['./subject-feed.component.scss']
})
export class SubjectFeedComponent implements OnInit {
  classworks = [];
  userSubjet: UserSubjectGrade;
  subjectId: any;
  lessons: TopicContent[];
  newTopicContent: TopicContent;
  showAdd: boolean;
  subjectItems: SliderWidgetModel[] = [];
  user: User;
  constructor(
    private router: Router,
    private topicContentService: TopicContentService,
    private userSubjectUserSubjectGradeService: UserSubjectUserSubjectGradeService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private uxService: UxService,



  ) {
    this.activatedRoute.params.subscribe(r => {
      this.subjectId = r.id;
      this.getLessons();
    });

  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;



    this.newTopicContent = {
      TopicContentId: '',
      TopicId: '',
      SubjectId: this.subjectId,
      Tittle: '',
      ContentBody: '',
      ContentType: '1',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }

  }
  goto(url) {
    this.router.navigate([`admin/dashboard/${url}`]);
  }
  back() {
    this.router.navigate([`admin/dashboard/`]);
  }
  save() {

    this.topicContentService.add(this.newTopicContent).subscribe(data => {
      if (data && data.TopicContentId) {
        this.view(data);
      }
    });
  }
  view(item: TopicContent) {
    this.router.navigate([`admin/dashboard/manage-subject-feed`, item.TopicContentId]);
  }

  getLessons() {
    this.uxService.showLoader();
    if (this.subjectId) {
      this.userSubjectUserSubjectGradeService.getById(this.subjectId).subscribe(data => {
        console.log(data);
        if (data) {

          this.lessons = data.Topiccontent;
          this.userSubjet = data;
          this.uxService.hideLoader();
          this.loadWidgetItems();
        }
      })
    }
  }

  loadWidgetItems() {

    this.subjectItems.push({
      Name: `Due dates`,
      Description: `${this.lessons.length} items due this week`,
      Link: `admin/dashboard/manage-subject-feed/lessons`
    })
    this.subjectItems.push({
      Name: `Lessons`,
      Description: `${this.lessons.length} items`,
      Link: `admin/dashboard/subject-lessons/${this.subjectId}`
    })
    this.subjectItems.push({
      Name: `Work to be done`,
      Description: `${this.lessons.length} items`,
      Link: `admin/dashboard/manage-subject-feed/lessons`
    })
    this.subjectItems.push({
      Name: `Announcements `,
      Description: `${this.lessons.length} items`,
      Link: `admin/dashboard/manage-subject-feed/lessons`
    })
    this.subjectItems.push({
      Name: `Discussions `,
      Description: `${this.lessons.length} items`,
      Link: `admin/dashboard/manage-subject-feed/lessons`
    })

  }

}


