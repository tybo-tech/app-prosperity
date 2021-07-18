import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderWidgetModel } from 'src/models/UxModel.model';

@Component({
  selector: 'app-card-list-widget',
  templateUrl: './card-list-widget.component.html',
  styleUrls: ['./card-list-widget.component.scss']
})
export class CardListWidgetComponent implements OnInit {
  @Input() items: SliderWidgetModel[];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goto(id) {
    this.router.navigate([id]);
  }

}
