import { defHttp } from '/@/utils/http/axios';

enum Api {
  UploadImage = '/utils/uploadImage',
}

/** 上传图片*/
export const uploadImage = ({ file, name, type = 'normal' }) => {
  console.log('_uploadImage type', type);
  const formData = new FormData();
  // 第三个参数为文件名
  // console.log('_file', file);
  // console.log('_name', name);
  formData.append('file', file, `${name}.png`);

  return defHttp.post({
    url: Api.UploadImage,
    params: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 10000,
    responseType: 'json',
    transformResponse: (res, config) => {
      if (type === 'uploadComponent') {
        config.isUploadComponent = true; //  上传组件添加标识区分
        return JSON.parse(res);
      } else {
        return JSON.parse(res);
      }
    },
  });
};
