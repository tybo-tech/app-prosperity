import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models';
import { Topic } from 'src/models/topiccontent.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { SliderWidgetModel } from 'src/models/UxModel.model';
import { AccountService } from 'src/services';
import { TopicService } from 'src/services/topic.service';
import { UserSubjectUserSubjectGradeService } from 'src/services/user-subject.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-subject-lessons',
  templateUrl: './subject-lessons.component.html',
  styleUrls: ['./subject-lessons.component.scss']
})
export class SubjectLessonsComponent implements OnInit {

  classworks = [];
  userSubjet: UserSubjectGrade;
  subjectId: any;
  lessons: Topic[];
  newTopic: Topic;
  showAdd: boolean;
  subjectItems: SliderWidgetModel[] = [];
  user: User;
  constructor(
    private router: Router,
    private topicService: TopicService,
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



    this.newTopic = {
      TopicId: '',
      SubjectId: this.subjectId,
      Name: '',
      Description: '',
      ImageUrl: '',
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

    this.topicService.add(this.newTopic).subscribe(data => {
      if (data && data.TopicId) {
        this.view(data);
      }
    });
  }
  view(item: Topic) {
    this.router.navigate([`admin/dashboard/manage-subject-feed`, item.TopicId]);
  }

  getLessons() {
    this.uxService.showLoader();
    if (this.subjectId) {
      this.topicService.getTopicsBySubjectID(this.subjectId).subscribe(data => {
        console.log(data);
        if (data) {
          this.lessons = data;
          this.uxService.hideLoader();
          this.loadWidgetItems();
        }
      })
    }
  }

  loadWidgetItems() {
    this.lessons.forEach(item => {
      this.subjectItems.push({
        Name: `${item.Name} `,
        Description: this.uxService.getTimeString(item.CreateDate),
        Link: `admin/dashboard/manage-subject-feed/${item.TopicId}`
      })
    })
  }

}
