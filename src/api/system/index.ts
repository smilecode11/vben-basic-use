import { defHttp } from '/@/utils/http/axios';
import { AccountParams, AccountListGetResultModel } from './model/accountModel';
import { DeptParams, DeptListGetResultModel } from './model/deptModel';
import {
  RoleParams,
  RolePageParams,
  RoleListGetResultModel,
  RolePageListGetResultModel,
} from './model/roleModel';
import { MenuParams, MenuListGetResultModel } from './model/menuModel';

enum Api {
  AccountList = '/system/getAccountList',
  DeptList = '/system/getDeptList',
  MenuList = '/system/getMenuList',
  RoleListByPage = '/system/getRoles',
  GetAllRoleList = '/system/getAllRoleList',
  SetRoleStatus = '/system/setRoleStatus',
  DeleteRole = '/system/deleteRole',
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

/**
 * @description 获取菜单列表
 */
export const getMenuList = (params: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({
    url: Api.MenuList,
    params,
  });

/**
 * @description 获取角色列表(分页)
 */
export const getRoleListByPage = (params: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({
    url: Api.RoleListByPage,
    params,
  });

/**
 * @description 获取全部角色列表
 */
export const getAllRoleList = (params: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({
    url: Api.GetAllRoleList,
    params,
  });

/**
 * @description 设置角色状态
 */
export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({
    url: Api.SetRoleStatus,
    params: { id, status },
  });

/**
 * @description 删除角色
 */
export const deleteRole = ({ id }: { id: string }) =>
  defHttp.post({
    url: Api.DeleteRole,
    params: { id },
  });
