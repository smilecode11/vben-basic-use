import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}
export interface CreateRoleParams {
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  remark: string;
  menu: string;
}

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;
export type RoleListGetResultModel = RoleListItem[];
export type CreateRoleResultModel = {
  id: string | number;
};
