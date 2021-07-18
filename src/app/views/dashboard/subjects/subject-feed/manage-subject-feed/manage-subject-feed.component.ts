import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Email, User } from 'src/models';
import { Images } from 'src/models/images.model';
import { ModalModel } from 'src/models/modal.model';
import { Topic, TopicContent } from 'src/models/topiccontent.model';
import { UploadService, AccountService, EmailService } from 'src/services';
import { TopicService } from 'src/services/topic.service';
import { TopicContentService } from 'src/services/topiccontent.service';
import { UxService } from 'src/services/ux.service';
import { SOMETHING_SAVED, SOMETHING_UPDATED, TITLES } from 'src/shared/constants';

@Component({
  selector: 'app-manage-subject-feed',
  templateUrl: './manage-subject-feed.component.html',
  styleUrls: ['./manage-subject-feed.component.scss']
})
export class ManageSubjectFeedComponent implements OnInit {

  editorStyle = {
    marginBottom: '30px',
  }

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
      ['link', 'video']
    ]
  };
  modalModel: ModalModel = {
    heading: undefined,
    body: [],
    ctaLabel: 'Go back to learners',
    routeTo: 'admin/dashboard/list-learners',
    img: undefined
  };


  showLoader: boolean;
  topicChaged: boolean;
  showGotoCustomer: boolean;
  studentMode: boolean;

  heading: string;
  TopicId: string;

  existingUser: User;
  user: User;
  users: User[];

  emailToSend: Email;
  TITLES = TITLES;
  newTopicContent: TopicContent;
  topic: Topic;

  constructor(
    private TopicService: TopicService,
    private topicContentService: TopicContentService,
    private accountService: AccountService,
    private uxService: UxService,
    private router: Router,
    private emailService: EmailService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,


  ) {

    this.activatedRoute.params.subscribe(r => {
      this.TopicId = r.id;
      if (this.TopicId) {
        this.getTopic();
      }
    });
  }

  getTopic() {
    this.TopicService.getTopic(this.TopicId).subscribe(data => {
      if (data && data.TopicContent) {
        data.TopicContent.forEach(item => {
          item.SafeContentBody = this.sanitizer.bypassSecurityTrustHtml(item.ContentBody);
        });
        this.topic = data;
      }
    });
  }
  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user) {
      this.uxService.updateMessagePopState("You need to login")
      this.router.navigate(['']);
    }

  }



  save() {


    if (this.topic.TopicId && this.topic.TopicId.length > 5) {

      this.TopicService.update(this.topic).subscribe(data => {
        if (data && data.TopicId) {
        }
        this.uxService.updateMessagePopState(`Lesson ${SOMETHING_UPDATED}`);
        this.topicChaged = false;
      })
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

  addimage() {
    this.newTopicContent = {
      TopicContentId: `${new Date().getTime()}`,
      TopicId: this.topic.TopicId,
      SubjectId: this.topic.SubjectId,
      Tittle: '',
      ContentBody: '',
      ContentType: 'Images',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1,
      EditMode: true
    };
    this.topic.TopicContent.push(this.newTopicContent);
  }
  addNotes() {
    this.newTopicContent = {
      TopicContentId: '',
      TopicId: this.topic.TopicId,
      SubjectId: this.topic.SubjectId,
      Tittle: '',
      ContentBody: '',
      ContentType: 'Notes',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1,
      EditMode: true
    };
    this.topic.TopicContent.push(this.newTopicContent);
  }

  back() {
    this.router.navigate([`admin/dashboard/subject-feed/${this.topic.SubjectId}`]);
  }
  delete(item: TopicContent) {
    item.StatusId = 0;
    this.saveNotes(item);
  }
  saveNotes(item: TopicContent) {

    if (item && item.CreateDate && item.CreateDate.length > 5) {
      this.topicContentService.update(item).subscribe(data => {
        if (data && data.TopicContentId) {
          this.getTopic();
          this.uxService.updateMessagePopState(`${data.ContentType} ${SOMETHING_SAVED}`)
        }
      });
    } else {
      this.topicContentService.add(item).subscribe(data => {
        if (data && data.TopicContentId) {
          this.getTopic();
          this.uxService.updateMessagePopState(`{data.ContentType} ${SOMETHING_UPDATED}`)
        }
      });
    }

  }

  onUploadFinished(images: Images[]) {
    if (images) {
      this.saveNotes(this.newTopicContent);
    }
  }
  onDeleteImageEvent(image: Images) {
    if (image && image.ImageId) {
      this.getTopic();
    }
  }
}
