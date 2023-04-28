import { BasicFetchResult } from '/@/api/model/baseModel';

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;
