/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListLearnersComponent } from './list-learners.component';

describe('ListLearnersComponent', () => {
  let component: ListLearnersComponent;
  let fixture: ComponentFixture<ListLearnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLearnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
