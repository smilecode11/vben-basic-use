import { BasicFetchResult } from '/@/api/model/baseModel';

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export interface DeptListItem {
  id: number;
  deptName: string;
  parentDept: number;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;
