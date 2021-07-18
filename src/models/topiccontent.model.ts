import { Images } from "./images.model";

export interface TopicContent {
  TopicContentId: string;
  TopicId: string;
  SubjectId: number;
  Tittle: string;
  ContentBody: string;
  ContentType: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Images?: Images[];
  Recordings?: Images[];
  EditMode?:boolean
  SafeContentBody?:any
}


export interface Topic {
  TopicId: string;
  SubjectId: number;
  Name: string;
  Description: string;
  ImageUrl: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  TopicContent?: TopicContent[];
}
