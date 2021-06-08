
export interface Category {
  ProductsImages?: string[];
  CategoryId: string;
  Name: string;
  ParentId: string;
  Description: string;
  DisplayOrder: number;
  CategoryType: string;
  CompanyType: string;
  ImageUrl: string;
  PhoneBanner: string;
  IsDeleted: boolean;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  IsSelected?: boolean;
  Class?: string[];
  Children?: Category[];
  Tertiary?: Category[];
  ShowChildren?: boolean;
  IsShop?: boolean;
}
