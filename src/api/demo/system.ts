import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  CreateRoleParams,
  CreateRoleResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  RolePageList = '/system/getRoles',
  GetAllRoleList = '/system/getAllRoleList',
  createRole = '/system/createRole',
  editorRole = '/system/editRole',
}

/** 获取菜单李列表*/
export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

/** 新建角色*/
export const createRole = (params: CreateRoleParams) =>
  defHttp.post<CreateRoleResultModel>({ url: Api.createRole, params });

/** 获取角色列表(分页)*/
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

/** 获取全部角色*/
export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

/** 设置角色状态*/
export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

/** 编辑角色*/
export const editorRole = (params: CreateRoleParams & { id: number }) =>
  defHttp.post<CreateRoleResultModel>({ url: Api.editorRole, params });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
