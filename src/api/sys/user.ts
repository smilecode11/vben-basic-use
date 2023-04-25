import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  SmsParams,
  SmsModel,
  ResetPasswordParams,
  ResetPasswordModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  sendSmsCode = '/getSms',
  resetPassword = '/resetPassword',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

/**
 * @description 发送验证码
 */
export function sendSmsCode(params: SmsParams) {
  return defHttp.post<SmsModel>(
    {
      url: Api.sendSmsCode,
      params,
    },
    {
      errorMessageMode: 'message',
    },
  );
}

/**
 * @description 重置密码
 */
export function resetPassword(params: ResetPasswordParams) {
  return defHttp.post<ResetPasswordModel>(
    {
      url: Api.resetPassword,
      params,
    },
    {
      errorMessageMode: 'message',
    },
  );
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
