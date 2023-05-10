import { defHttp } from '/@/utils/http/axios';
import { AccountParams, AccountListGetResultModel } from './model/accountModel';
import { DeptParams, DeptListGetResultModel } from './model/deptModel';
import {
  RoleParams,
  RolePageParams,
  RoleListGetResultModel,
  RolePageListGetResultModel,
  CreateRoleParams,
  CreateRoleResultModel,
} from './model/roleModel';
import { MenuParams, MenuListGetResultModel } from './model/menuModel';

enum Api {
  AccountList = '/system/getAccountList',
  DeptList = '/system/getDeptList',
  RoleListByPage = '/system/getRoles',
  SetRoleStatus = '/system/setRoleStatus',
  RolePageList = '/system/getRoles',
  GetAllRoleList = '/system/getAllRoleList',
  createRole = '/system/createRole',
  DeleteRole = '/system/deleteRole',
  editorRole = '/system/editRole',
  MenuList = '/system/getMenuList',
  GetAllMenu = '/system/getAllMenu',
  AddMenu = '/system/addMenuItem',
  EditMenu = '/system/editMenuItem',
  DeleteMenu = '/system/deleteMenu',
}

/**
 * @description 获取账号列表
 */
export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({
    url: Api.AccountList,
    params,
  });

/**
 * @description 获取部门列表
 */
export const getDeptList = (params: DeptParams) =>
  defHttp.get<DeptListGetResultModel>({
    url: Api.DeptList,
    params,
  });

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
  defHttp.post({ url: Api.SetRoleStatus, params: { id, status } });

/** 编辑角色*/
export const editorRole = (params: CreateRoleParams & { id: number }) =>
  defHttp.post<CreateRoleResultModel>({ url: Api.editorRole, params });

/** 删除角色*/
export const deleteRole = ({ id }: { id: string }) =>
  defHttp.post({ url: Api.DeleteRole, params: { id } });

/** 获取菜单列表*/
export const getMenuList = (params: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

/** 获取全部菜单*/
export const getAllMenu = (params) => defHttp.get({ url: Api.GetAllMenu, params });

/** 新增菜单*/
export const addMenu = (params) => defHttp.post({ url: Api.AddMenu, params });

/** 编辑菜单*/
export const editMenu = (params) => defHttp.post({ url: Api.EditMenu, params });

/** 删除菜单*/
export const deleteMenu = ({ id }) => defHttp.post({ url: Api.DeleteMenu, params: { id } });
