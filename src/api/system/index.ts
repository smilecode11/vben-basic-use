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
  GetDeptList = '/system/getDeptList',
  GetAllDept = '/system/getAllDept',
  AddDept = '/system/addDept',
  EditDept = '/system/editDept',
  DeleteDept = '/system/deleteDept',
  AccountList = '/system/getAccountList',
  AddAccount = '/system/addAccount',
  EditAccount = '/system/editAccount',
  DeleteAccount = '/system/deleteAccount',
  isAccountExist = '/system/isAccountExist',
}

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

/**
 * @description 获取部门列表
 */
export const getDeptList = (params: DeptParams) =>
  defHttp.get<DeptListGetResultModel>({
    url: Api.GetDeptList,
    params,
  });

/** 获取全部部门 tree */
export const getAllDepts = (params = {}) => defHttp.get({ url: Api.GetAllDept, params });

/** 新增部门*/
export const addDept = (params) => defHttp.post({ url: Api.AddDept, params });

/** 编辑部门*/
export const editDept = (params) => defHttp.post({ url: Api.EditDept, params });

/** 删除部门*/
export const deleteDept = ({ id }) => defHttp.post({ url: Api.DeleteDept, params: { id } });

/**
 * @description 获取账号列表
 */
export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({
    url: Api.AccountList,
    params,
  });

/** 新增账号*/
export const addAccount = (params) => defHttp.post({ url: Api.AddAccount, params });

/** 编辑账号*/
export const editAccount = (params) => defHttp.post({ url: Api.EditAccount, params });

/** 删除账号*/
export const deleteAccount = ({ id }) => defHttp.post({ url: Api.DeleteAccount, params: { id } });

export const isAccountExist = (params) => defHttp.post({ url: Api.isAccountExist, params });
