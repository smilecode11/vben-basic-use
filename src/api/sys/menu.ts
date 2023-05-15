import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  GetAccountMenuList = '/system/getAccountMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

/** 获取账号菜单列表*/
export const getAccountMenuList = () => {
  return defHttp.post({ url: Api.GetAccountMenuList });
};
