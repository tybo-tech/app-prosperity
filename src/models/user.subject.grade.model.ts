export interface UserSubjectGrade {
  Id: string;
  UserId: string;
  SubjectId: string;
  GradeId: string;
  UserType: string;
  Year: number;
  SubjectName: string;
  GradeName: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
}
